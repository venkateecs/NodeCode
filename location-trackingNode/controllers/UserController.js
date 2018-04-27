const bcrypt = require('bcrypt');
const _ = require('lodash');
const UserModel = require('../models/User');
const AccountModel = require('../models/Account');
const AccountLocationModel = require('../models/AccountLocation');
const logger = require('../util/logger');
const r = require('../util/response-helper');

class UserController {
  /**
   * Get Locations based on pinId
   * @param {payload} Object 
   * @param {payload.pinId} String
   * @return Array of all locations of pinId
   */
  static getLocations(payload) {
    return (async () => {
      try {
        const account = await AccountModel.query()
          .where('account_pin', payload.pinId)
          .first();
        if (account) {
            let locations = await AccountLocationModel.query()
            .where('account_id',account.id)
            return r.success('Location Data',locations);
        }
        return r.error('Please provide valid Pin Id', null, 401);
      } catch (e) {
        logger.error(e);
        return r.error();
      }
    })();
  }
  /**
   * Add New location to the account user
   * @param {Object} payload 
   * @param {payload.location} Array
   * @param {location.lat}
   * @param {location.long}
   * @param {location.acc}
   * @return Last inserted location object
   */
  static addLocation(payload) {
      return (async () => {
        try{
            let locationData = null;
            for(let location of payload.location){
                location.timestamp = new Date();
                locationData = await AccountLocationModel.query()
                .insert(location)
            }
            return r.success('Location Added Successfully',locationData);
        }catch (e){
            logger.error(e);
            return r.error();
        }
      })();
  }
  /**
   * Add new Account
   * @param {*} payload 
   * @param {payload.account_pin} number
   * @param {payload.first_name}
   * @param {payload.last_name}
   * @param { payload.constituency}
   * @return {Object} account
   */
  static addAccount(payload) {
    return (async () => {
        try{
            let account = await AccountModel.query()
            .insert(payload)
            return r.success('Account Added Successfully',account);
        }catch (e){
            logger.error(e);
            return r.error();
        }
      })();
  }
  /**
   * To get Account Data using PinId
   * @param {payload} 
   * @param {payload.pinId} 
   * @return {Object} account
   */
  static getAccount(payload) {
    return (async () => {
        try{
            let account = await AccountModel.query()
            .where('account_pin', payload.pinId)
            .first()
            console.log(account);
            return r.success('Account Details',account);
        }catch (e){
            logger.error(e);
            return r.error();
        }
      })();
  }
  /**
   * Adds a new User to the application
   * @param {payload} Object 
   * @param {payload.first_name}
   * @param {payload.last_name}
   * @param {payload.email}
   * @param {payload.password}
   * @return userAccount 
   */
  static addUser(payload) {
    return (async () => {
        try{
            payload.is_Active = 1;
            payload.is_deleted = 0;
            let userAccount = await UserModel.query()
            .insert(payload)
            return r.success('User Added Successfully',userAccount);
        }catch (e){
            logger.error(e);
            return r.error();
        }
      })();
  }
  /**
   * Get all user accounts
   * @return array of accounts
   */
  static getAllAccounts() {
    return (async () => {
        try{
            let accounts = await AccountModel.query()
            .orderBy('id')
            return r.success('All Accounts',accounts);
        }catch (e){
            logger.error(e);
            return r.error();
        }
    })()
  }
}

module.exports = UserController;
