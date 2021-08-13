import { UserDB } from './db/driver/users/UserDB';
import { DBJanitor } from './db/janitor';
import { PortFinder } from './server/ports/PortFinder';
import { startServer } from './server/server';

// setInterval(() => {
//   PortFinder.getFree().then(inst => {
//     if (!inst) {
//       console.log('all used')
//       return
//     }
//     console.log(inst.port)
//     setTimeout(() => {
//       inst.free()
//       console.log('free', inst.port)
//     }, Math.random() * 500)
//   }).catch()
// }, 400)

PortFinder.getFree()
  .then(inst => {
    if (!inst) {
      console.log('all used');
      return;
    }
    console.log('got', inst.port);
    setTimeout(() => {
      inst.free();
      console.log('free', inst.port);
    }, 1000);
  })
  .catch();

setTimeout(() => {
  PortFinder.getFree()
    .then(inst => {
      if (!inst) {
        console.log('all used');
        return;
      }
      console.log('got', inst.port);
    })
    .catch();
}, 500);

setTimeout(() => {
  PortFinder.getFree()
    .then(inst => {
      if (!inst) {
        console.log('all used');
        return;
      }
      console.log('got', inst.port);
      setTimeout(() => {
        inst.free();
        console.log('free', inst.port);
      }, 1000);
    })
    .catch();
}, 1500);

startServer();

process.on('SIGTERM', () => {
  console.log('shutting down...');
  UserDB.shutdown();
  DBJanitor.instance.kill();
});
