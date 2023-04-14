import { call, CallEffect, ForkEffect, takeEvery } from 'redux-saga/effects'
import { workItemsAction } from './redux'

type TWorkItemsSaga = Generator<CallEffect<void>, void, unknown>
export function* workItemsSaga(): TWorkItemsSaga {
  // do some saga magic
  yield call(console.log, 'Inside workItems saga')
}

type TInitializeWorkItemsSaga = Generator<ForkEffect<never>, void, unknown>
export function* initializeWorkItemsSaga(): TInitializeWorkItemsSaga {
  yield takeEvery(workItemsAction, workItemsSaga)
}
