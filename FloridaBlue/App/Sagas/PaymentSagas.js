import { call, put} from 'redux-saga/effects'
import PaymentActions from '../Redux/PaymentRedux'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * payment (api) {
  console.tron.log('I am coming from payment Sagas')
    // api.setsmTokenHeaders(smToken);
 const response = yield call(api.getPayment)
 let idsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAiCAMAAAAtWWZIAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMA/1uRIrUAAABpSURBVHic7c/BDcAwCENRe/+lKwgO7QiV/iUyCJI82bJk16EO1fC76KyKJ3fXGemuPtWZmzArStzad3Z/sBtzr3VfctaUv6a9Y0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIED+BnkAXYAMwYW/U1QAAAAASUVORK5CYII='
  console.tron.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    data = {
      payment : idsrc
    }
    console.tron.log('This is from Service:'+this.data)
    yield put(PaymentActions.paymentSuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(PaymentActions.paymentFailure(error))
  }

}