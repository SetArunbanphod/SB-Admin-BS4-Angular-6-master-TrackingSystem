import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from '@angular/fire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private userData: any;
  role: string;
  public nodeList: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.userData = JSON.parse(localStorage.getItem('user'));
    if (this.userData.email === 'work.set.138@gmail.com') {
      this.role = 'admin';
    } else {
      this.role = 'user';
    }
  }

  addNewCar(carData) {
    const pushNewNode = this.db.database
      .ref('user')
      .child(this.userData.uid)
      .push();
    pushNewNode.set(carData).catch(err => {
      alert(err);
    });
    this.addNode(carData);
  }

  setNotification(data) {
    this.db
      .list('/user/' + this.userData.uid + '/')
      .query.orderByChild('car_id')
      .equalTo(data.car_id)
      .once('value', res => {
        const keyCar = Object.keys(res.val())[0];
        this.db
          .object('/user/' + this.userData.uid + '/' + keyCar)
          .update({
            hightLevel: data.hightLevel,
            lowLevel: data.lowLevel
          })
          .catch(err => {
            alert(err);
          });
      });
    this.db
      .list('/nodemcu/')
      .query.orderByChild('car_id')
      .equalTo(data.car_id)
      .once('value', res => {
        res.forEach(element => {
          const nodemcu = element.val();
          this.db
            .object('/nodemcu/' + nodemcu.nodeId)
            .update({
              hightLevel: data.hightLevel,
              lowLevel: data.lowLevel
            })
            .catch(err => {
              alert(err);
            });
        });
      });
  }

  addNode(carData) {
    this.db
      .list('/user/' + this.userData.uid + '/')
      .query.orderByChild('car_id')
      .equalTo(carData.car_id)
      .once('value', res => {
        res.forEach(element => {
          const h_temp = element.val().hightLevel;
          const l_temp = element.val().lowLevel;
          if (h_temp !== undefined && l_temp !== undefined) {
            this.db
              .object('/nodemcu/' + carData.nodeId)
              .update({
                nodeId: carData.nodeId,
                car_id: carData.car_id,
                userId: this.userData.uid,
                email: this.userData.email,
                hightLevel: h_temp,
                lowLevel: l_temp
              })
              .catch(err => {
                alert(err);
              });
          } else {
            this.db
              .object('/nodemcu/' + carData.nodeId)
              .update({
                nodeId: carData.nodeId,
                car_id: carData.car_id,
                userId: this.userData.uid,
                email: this.userData.email
              })
              .catch(err => {
                alert(err);
              });
          }
        });
      });
  }

  getNodeLogsDataByuserId() {
    if (this.role === 'admin') {
      return this.db.list('/nodemcu').valueChanges();
      console.log('admin');
    }
    console.log('User');
    console.log(this.userData.uid);
    return this.db.list('nodemcu', ref => ref.orderByChild('userId').equalTo(this.userData.uid)).valueChanges();

  }
  getLogsDataBynodeId(nodeId) {
    this.db.database.ref('nodemcu/node-id-002').on('child_changed', shapshot => {

    });
    return this.db.list('logs/' + nodeId).valueChanges();
  }

  getNodeByUser() {
    return this.db.list('user/' + this.userData.uid).valueChanges();
  }



  findNodemcuBycar_id(carId) {
    return this.db.list('/nodemcu', ref => ref.orderByChild('car_id').equalTo(carId)).valueChanges();
  }

  findGpsBycar_id(car_id) {
    return this.db.list('/gps', ref => ref.orderByKey().equalTo(car_id)).valueChanges();
  }

  deleteNode(nodeId) {
    this.db
      .object('/nodemcu/' + nodeId)
      .remove()
      .catch(err => {
        alert(err);
      });
    this.db
      .object('/logs/' + nodeId)
      .remove()
      .catch(err => {
        alert(err);
      });
  }
  deleteLogs(nodeId) {
    this.db
      .object('/logs/' + nodeId)
      .remove()
      .catch(err => {
        alert(err);
      });
  }

  getNotification() {
    return this.db.object('notification/' + this.userData.uid).valueChanges();
  }

  deleteNotifyByKey(key) {
    this.db
      .object('notification/' + this.userData.uid + '/' + key)
      .remove()
      .catch(err => {
        alert(err);
      });
  }

  saveNotify(data, mess) {
    // const pushNewNode = this.db.database
    //   .ref('notification')
    //   .child(this.userData.uid)
    //   .push();
    // pushNewNode
    //   .set({
    //     notifyCar: data.car_id,
    //     notifyNodeId: data.nodeId,
    //     notifyTemp: data.temperature,
    //     notifyTime: data.timestamp,
    //     message: mess
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });

      this.db.database.ref('nodemcu/' + data.nodeId).update({notify : false});
  }
  getTest(id) {
    return this.db.list('logsTest/' + id).valueChanges();
  }
}


