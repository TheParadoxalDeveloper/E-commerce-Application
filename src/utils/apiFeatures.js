
export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }

    pagination() {
        let pageNum = this.searchQuery.page * 1 || 1
        let limit = 4
        if (this.searchQuery.page < 0) pageNum = 1
        let skip = (parseInt(pageNum) - 1) * limit
        this.pageNum = pageNum
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }

    filtering() {
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)
        let excludeValues = ['page', 'sort', 'fields', 'search']
        excludeValues.forEach((val) => {
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj)
        return this
    }

    sorting() {
        if (this.searchQuery.sort) {
            let sortObj = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortObj)
        }
        return this
    }

    selectedFields() {
        if (this.searchQuery.fields) {
            let selectObj = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(selectObj)
        }
        return this
    }

    searching() {
        if (this.searchQuery.search) {
            this.mongooseQuery = this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.search, $options: 'i' } },
                    { description: { $regex: this.searchQuery.search, $options: 'i' } },
                ]
            })
        }
        return this
    }
}