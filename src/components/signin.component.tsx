import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {CounterModel} from '../models/counter.model';
import {Button, Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import {CycleComponent} from '../util/component';

export class SignIn extends CycleComponent<{}, {}> {

    redraw(state: {}): false | JSX.Element | null {
        throw new Error('Method not implemented.');
    }
}
