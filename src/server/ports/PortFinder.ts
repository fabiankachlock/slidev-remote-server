import http from 'http';
import { PortInstance } from './PortInstance';

export class PortFinder {
  public static readonly minPort = 1000;
  public static readonly maxPort = 65535;

  private static allUsed: boolean = false;
  private static hint: number = PortFinder.minPort;
  private static freePorts: number[] = [];

  public static getFree = async (): Promise<PortInstance | undefined> => {
    if (PortFinder.allUsed) return undefined;

    let port = -1;

    await PortFinder.findCachedPort()
      .then(foundPort => {
        port = foundPort;
      })
      .catch(() => {});

    if (port < 0) {
      await PortFinder.bruteforceFindPort(PortFinder.hint)
        .then(foundPort => {
          port = foundPort;
        })
        .catch(() => {});
    }

    if (port < 0) {
      await PortFinder.bruteforceFindPort(0, PortFinder.hint)
        .then(foundPort => {
          port = foundPort;
        })
        .catch(() => {});
    }

    if (port < 0) {
      PortFinder.allUsed = true;
      return undefined;
    }

    PortFinder.allUsed = false;
    PortFinder.hint = port + 1;
    return new PortInstance(port, PortFinder.createFreePortCallback(port));
  };

  private static createFreePortCallback = (port: number) => () => {
    PortFinder.freePorts.push(port);
    PortFinder.allUsed = false;
  };

  private static findCachedPort = (): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      let foundPort = false;
      let freePort = -1;
      let newPorts: number[] = [];

      console.log('chache');
      for (const port of PortFinder.freePorts) {
        if (foundPort) {
          newPorts.push(port);
        }

        const isFree = await PortFinder.testPort(port);
        if (isFree) {
          freePort = port;
          foundPort = true;
        }
      }

      PortFinder.freePorts = newPorts;

      if (foundPort && freePort > 0) {
        return resolve(freePort);
      }
      return reject('no chached port free');
    });
  };

  private static bruteforceFindPort = (start: number, max: number = PortFinder.maxPort): Promise<number> => {
    return new Promise(async (resolve, reject) => {
      let port = start;
      while (port <= max) {
        const isFree = await PortFinder.testPort(port);
        if (isFree) {
          return resolve(port);
        }
        port += 1;
      }
      return reject('no port free');
    });
  };

  private static testPort = async (port: number): Promise<boolean> => {
    return new Promise(resolve => {
      const server = http.createServer();

      server.once('error', err => {
        // @ts-expect-error
        if (err.code === 'EADDRINUSE') {
          resolve(false);
        } else {
          resolve(true);
        }
        server.close();
      });

      server.once('listening', () => {
        resolve(true);
        server.close();
      });

      server.listen(port);
    });
  };
}
