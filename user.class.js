var data = require('./data.json'); // json data to get categories and channels

/**
 * Create User class to manage all user operations
 */
class User {
    balance = 0;
    basic_pack_id;
    user_channels = [];

    // Constructor to set initial channel into user's account
    constructor() {

        // Filter basic pack from the list categories
        // By default, We will assign all the channel of basic pack to the user
        // Basic pack can be only 1 so take id of object of 0 index only
        this.basic_pack_id = data.categories.filter((category) => {
            return category.is_basic_pack;
        })[0].id;

        // Set default channels to tariff
        this.user_channels = data.channels.filter((channel) => {
            return channel.category == this.basic_pack_id;
        })
    }

    /**
     * function add user balance
     * @param: Float amount
     * @return: Float amount
     */
    addBalance(amount) {
        this.balance += this.round(amount);
        return this.balance;
    }

    /**
     * function to get user balance
     * @param: 
     * @return: Float amount
     */
    getBalance() {
        return this.round(this.balance);
    }

    /**
     * function to view current channel
     * @param: 
     * @return: Array of channels
     */
    viewChannels() {
        return this.user_channels;
    }

    /**
     * function to add a channel into user's tariff
     * @param: Object of channel
     * @return: String of Success/Error message
     */
    addChannel(channel) {

        // Check whether channel already exists in user's tariff plan 
        let found = this.user_channels.some(u_channel => u_channel.id === channel.id)

        // If channel does not exists in user's tariff, check if user have balance into his account
        if (!found) {
            if (this.balance >= channel.price) {
                this.balance -= channel.price;
                this.user_channels.push(channel)
                return 'Channel added successfully in your tariff plan'
            } else {
                return 'You don\'t have sufficient balance to add this channel in your tariff plan'
            }

        }
        else {
            return 'Channel already exists in your tariff plan'
        }
    }

    /**
     * function to delete a channel from user's tariff
     * @param: Channel name
     * @return: String of Success/Error message
     */
    deleteChannel(channel_name) {

        // Check whether channel name exists in user's tariff or not
        let found = this.user_channels.some(u_channel => u_channel.name.toLowerCase() === channel_name.toLowerCase())

        // If channel exists in user's tariff, remove from the list
        if (found) {
            this.user_channels = this.user_channels.filter((channel) => { return channel.name.toLowerCase() != channel_name.toLowerCase() });
            return 'Channel removed from your tariff plan';
        } else {
            return `You don't have ${channel_name} in your tariff plan`;
        }
    }

    /**
     * function to round the number
     * @param: number
     * @returns: floating number upto 2 decimal digit
     */
    round(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }
}

module.exports = {
    User: User
}