import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

const POLL_INTERVAL = 1000;

export function getMessagesSource(roomId) {
  const observable = Observable.ajax(`/rooms/${roomId}/messages.json`);
  const source = Observable.interval(POLL_INTERVAL)
    .flatMap(() => observable);

  return source.map(e => e.response);
}

export function getRoomsSource(roomId) {
  const observable = Observable.ajax('/rooms.json');
  const source = Observable.interval(POLL_INTERVAL)
    .flatMap(() => observable);

  return source.map(e => e.response);
}
