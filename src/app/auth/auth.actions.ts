import { Action } from '@ngrx/store';
import { User } from './user.model';



export const SET_USER = '[AUTH] Set user';

export class SetUserAction implements Action{
    readonly type = SET_USER;

    constructor(public user: User){}
}    



export type actions = SetUserAction;