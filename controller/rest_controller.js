const restService = require("../service/rest_service");

class RestController {

    async getCovidResult(max_result, observation_date){
        return await restService.getCovidResult(max_result, observation_date);
    }

    async addBulkData(){
        await restService.bulkData();
    }
}

module.exports = new RestController();