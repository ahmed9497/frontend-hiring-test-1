const formattedData = (data,struct) => {
    // console.log(data)
    let format = Object.keys(data)
        .filter((k) => k !== "")
        .reduce((a, key) => {

            return [...a, { name: `${key}`, value: data[key] }]
        }, [])
    // console.log(format);
    let d = [];
    struct?.forEach(element => {
        // console.log(element)
        for (let key in element) {

            // console.log(key, element[key]);
            let nestedArray = element[key];
            let temp = [];
            nestedArray?.forEach(e => {
                // console.log(key, e, "**********")
                let single = format?.find(i => i.name === e);
                // console.log(single);
                if (single) {
                    temp.push(single)
                }
                else {
                    temp.push({ name: e, value: 0 })
                }
            });
            let obj = {
                [key]: temp
            }
            // console.log(obj)
            d.push(obj);
        }
    });
    let processData = [];
    d.forEach((item, index) => {

        for (let i in item) {
            let o = {
                title: i,
                value: item[i]
            }
            // console.log(o);
            processData.push(o);
        }



    })

    // console.log(processData);
   
    return processData;
    // return format;
}

export {formattedData};