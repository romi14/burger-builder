import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',() => {
    it('should return the initial state',() => {
        expect(reducer(undefined,{})).toEqual({//we didn't use enzyme here because reducer is a function with nothing nested inside of it..can be directly executed
            token :null,
            userId :null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        })
    })

    it('should store the token upon login',() => {
        expect(reducer({
            token :null,
            userId :null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        },{
          type : actionTypes.AUTH_SUCCESS,
          idToken : 'some-token',
          userId : 'some-user-id'  
        })).toEqual({
            token :'some-token',
            userId :'some-user-id',
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    })
});