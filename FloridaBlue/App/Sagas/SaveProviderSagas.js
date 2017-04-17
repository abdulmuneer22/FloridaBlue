import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import SaveProviderRedux from '../Redux/SaveProviderRedux';

const savedProviders = [];

export function* addSavedProvider(action) {
    const { data } = action
    // make the call to the api
   // const isDataAvailable = savedProviders.find((data) => data.providerKey === data.providerKey)
  //  if (!isDataAvailable) {
        savedProviders.push(data);
  //  }
    yield put(SaveProviderRedux.addProviderSuccess(savedProviders));

}

export function* removeSavedProvider(action) {
    const { savedProviderKey } = action
    // make the call to the api
    console.log(savedProviderKey)
    const indexOfsavedProviderToDelete = savedProviders.findIndex(savedProvider => {
        savedProvider.providerKey === savedProviderKey;
    });
    savedProviders.splice(indexOfsavedProviderToDelete, 1);
    yield put(SaveProviderRedux.removeProviderSuccess(savedProviders));
}