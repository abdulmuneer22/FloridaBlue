import { put } from 'redux-saga/effects'
import SearchDataActions from '../Redux/SearchDataRedux'
//import axios from 'axios'
// attempts to login
export function * searchdata() {
    console.log("I am coming from Dummy Data")
    var data =
        {
            workingHours: {
                displayName: 'Working hours',
                workHoursList: [
                    {
                        "hours": "No Preference"
                    },
                    {
                        "hours": "Regular (M-F 8am-5pm)"
                    },
                    {
                        "hours": "Extended(M-F before 8am or after 5pm)"
                    },
                    {
                        "hours": "Weekends"
                    }

                ]
            },

            acceptingPatient: {
                displayName: 'Accepting New Patients',
                acceptPatientList: [
                    {
                        "patientPreference": "No Preference"
                    },
                    {
                        "patientPreference": "Accepting new (all) patients"
                    },
                    {
                        "patientPreference": "Accept Current Patients Only"
                    },
                    {
                        "patientPreference": "Accepting Family members of current patients only"
                    },
                    {
                        "patientPreference": "Not Accepting New Patients"
                    }
                ]
            },

            program: {
                displayName: 'Programs',
                programList: [

                    {
                        "programName": "No Preference"
                    },
                    {
                        "programName": "Patient-Centered Medical Home"
                    },
                    {
                        "programName": "Accountable Care Program"
                    },
                    {
                        "programName": "Physician Discount"
                    },
                    {
                        "programName": "Essential Community Providers"
                    },
                    {
                        "programName": "Indian Health Provider"
                    },
                    {
                        "programName": "Blue Physician Recognition"
                    },
                    {
                        "programName": "Cardiology Care Collaborative"
                    },
                    {
                        "programName": "Oncology Medical Home"
                    },
                    {
                        "programName": "Value Choice Providers"
                    },
                    {
                        "programName": "Disability Distinction"
                    },


                ]
            }
        }

    yield put(SearchDataActions.searchdataSuccess(data))
}