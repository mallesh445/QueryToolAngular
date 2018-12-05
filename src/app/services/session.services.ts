import {Injectable} from '@angular/core';
import { ISession  } from './ISession.service'

    @Injectable()
    export class SessionService implements ISession {    
        private _session: ISession = {session:new Object()};

        constructor(){

        }

        set session(value){
            this._session.session = value;
        }

        get session(){
            return this._session.session
        }
   }