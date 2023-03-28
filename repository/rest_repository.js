const { connect } = require("../config/db_config");
const fs = require("fs");
const fastcsv = require("fast-csv");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

class RestRepository {
    db = {};

    constructor() {
        this.db = connect();
    }

    async getCovidResultByLimitAndObserveDate(max_result, observation_date) {
        const data = await this.db.rest.findAll({
            attributes: ['country', 
            [this.db.sequelize.fn('sum', this.db.sequelize.col('confirmed')), 'confirmed'],
            [this.db.sequelize.fn('sum', this.db.sequelize.col('deaths')), 'deaths'],
            [this.db.sequelize.fn('sum', this.db.sequelize.col('recovered')), 'recovered']
            ],
            where: {
                observation_date: observation_date
            },
            group: 'country',
            order: [['confirmed', 'DESC']],
            limit: max_result
        });

        return data;
    }

    async bulkInsert(data){
        try {
            await this.db.rest.bulkCreate(data)
            .then(() => console.log("Records saved"));
        } catch (err) {
            console.log(err);
        }
    }

    async storeDataAndSync(){
        this.db.sequelize.sync({ force: true}).then(() => {
            console.log("Drop and sync db");
        });

        let stream = fs.createReadStream(appDir + "/assets/covid_19_data.csv");
        let csvDataArr = [];
        let csvStream = fastcsv
        .parse()
        .on("data", function (data) {
            csvDataArr.push(data);
        })
        .on("end", function () {
            csvDataArr.shift(); // this will remove the header

            const records = [];
            csvDataArr.forEach((row) => {
            let data = {
                sno: row[0],
                province: row[2],
                country: row[3],
                last_update: new Date(row[4]),
                observation_date: new Date(row[1]),
                confirmed: parseInt(row[5]),
                deaths: parseInt(row[6]),
                recovered: parseInt(row[7]),
            };
            records.push(data);
            });

            new RestRepository().bulkInsert(records);
        
        });

        stream.pipe(csvStream);
    }
}

module.exports = new RestRepository();