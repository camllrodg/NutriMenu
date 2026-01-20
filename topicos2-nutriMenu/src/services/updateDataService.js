class UpdateDataService {
    async updateData(id, data, value) {
        for(let dataItem of data) {
            if(dataItem.id === id) {
                // Simular una llamada a una API o base de datos
                return new Promise((resolve) => {
                    setTimeout(() => {
                        dataItem.isPublished = value;
                        resolve(data);
                    }, 1000);
                });
            }
        }
    }
}

export const updateDataService = new UpdateDataService();