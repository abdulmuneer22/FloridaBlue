import { call, put} from 'redux-saga/effects'
import PaymentActions from '../Redux/PaymentRedux'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * paymentsRequest (api) {
  console.tron.log('I am coming from payment Sagas')
    // api.setsmTokenHeaders(smToken);
 const response = yield call(api.getPayment)
  console.tron.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    console.tron.log('This is from Service:'+this.data)
    yield put(PaymentActions.paymentsSuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(PaymentActions.paymentsFailure(error))
  }

}


// attempts to login
export function * paymentBarcodeRequest (api) {
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getPaymentBarcode)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data

    yield put(PaymentActions.paymentBarcodeSuccess(data))
  } else {
    // dispatch successful logins
   console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(PaymentActions.paymentBarcodeFailure(error))
  }

}