import { RegionDropDown } from "../Common/region-drop-down"

export interface PatientProfile {
    userId : number,
    allRegion: RegionDropDown[]
    bdate: Date
    city: string
    email: string
    firstName: string
    lastName: string
    mobile: string
    regionId: number
    state: string
    street: string
    zipCode: number
}

