export interface User {
  _id?: string
  name: string
  secondName: string
  email: string
  address: string
  phone: string
  cvSrc?: string
  userPic?: string
  favorite?: Vacancy[]
  createdVacancies?: Vacancy[]
  applied?: Vacancy[]
}

export interface Vacancy {
  _id?: string
  title: string
  companyName: string
  location: string
  expiryTime: Date
  contractType: string
  workTime: string
  experience: string
  postingDate: Date
  description: string
  salary: string
  companyPic: string
  createdBy: User
  applicants: applicant[]
  tags: string[]
}

export interface applicant {
  user: User
  cvSrc?: string
}

export interface Countries {
  adminCode1: string
  adminCodes1: string
  adminName1: string
  countryCode: string
  countryId: string
  countryName: string
  fcl: string
  fclName: string
  fcode: string
  fcodeName: string
  geonameId: number
  lat: string
  lng: string
  name: string
  population: number
  toponymName: string
}

export interface Country {
  geonameName: string
  geonameId?: string
}

export interface States {
  adminCode1: string
  adminName1: string
  countryCode: string
  countryId: string
  countryName: string
  fcl: string
  fclName: string
  fcode: string
  fcodeName: string
  geonameId: number
  lat: string
  lng: string
  name: string
  population: number
  toponymName: string
}

export interface State {
  geonameName: string
  geonameId?: string
}

export interface Regions {
  adminCode1: string
  adminCodes1: string
  adminName1: string
  countryCode: string
  countryId: string
  countryName: string
  fcl: string
  fclName: string
  fcode: string
  fcodeName: string
  geonameId: number
  lat: string
  lng: string
  name: string
  population: number
  toponymName: string
}

export interface Region {
  geonameName: string
  geonameId?: string
}

export interface Cities {
  adminCode1: string
  adminCodes1: string
  adminName1: string
  countryCode: string
  countryId: string
  countryName: string
  fcl: string
  fclName: string
  fcode: string
  fcodeName: string
  geonameId: number
  lat: string
  lng: string
  name: string
  population: number
  toponymName: string
}

export interface City {
  geonameName: string
  geonameId?: string
}