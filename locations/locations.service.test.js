
const locationsService = require('./locations.service')
const Location = require('./locations.model')

jest.mock('./locations.model')

describe('Location FindAll',()=>{
    it('Should call model find',async()=>{
        Location.find.mockResolvedValue([1,2,3,4])
        await locationsService.findAll()
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})


describe('Location FindOne',() =>{
    it('Should get a Location',async ()=>{
        jest.resetAllMocks()
        const mockLocation = {_id: '12345678', filmName: 'fifi brin dacier'}
        Location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne('12345678')).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledWith('12345678')///rajouter un reset du conteur
    })
    it('Should get an error',async ()=>{
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect(async ()=> await locationsService.findOne('12345678')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

