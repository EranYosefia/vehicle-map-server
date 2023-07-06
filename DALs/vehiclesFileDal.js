const jFile = require('jsonfile');

exports.getVehicles = () =>
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(__dirname + "/vehicles-location.json", function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}