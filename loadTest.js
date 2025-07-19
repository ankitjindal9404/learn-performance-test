import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 virtual users in 30 seconds
    { duration: '1m', target: 10 },  // Maintain 10 virtual users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 virtual users
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
