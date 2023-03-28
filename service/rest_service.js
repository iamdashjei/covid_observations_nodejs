const restRepository = require('../repository/rest_repository');

class RestService {
    constructor () {}

    async bulkData(){
        await restRepository.storeDataAndSync();
    }

    async getCovidResult(max_result, observation_date){
        return await restRepository.getCovidResultByLimitAndObserveDate(max_result, observation_date);
    }
}

module.exports = new RestService();