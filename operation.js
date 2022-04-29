// Require prompt. It includes functions to show input/choises to user
const prompt = require('./prompt');
const response = require('./response'); // require response file to show success/error message
const validate = require('./validate'); // require validate file to validate user inputs
const data = require('./data.json'); // json data which includes main questions, category and channels

// User object to perfect user operations like add balance, view channels etc.
const User = require('./user.class').User;
const userObj = new User();

/**
 * function showMainQuestion
 * This function will be called to show initial question to the user and based on choise we will show other questions
 */
let showMainQuestion = () => {
    return new Promise((resolve, reject) => {
        prompt.showChoices('Welcome. What would you like to do? Please choose,', data.main_questions)

            // We will get the selected choise as well as index. Based on index show relevant question 
            .then((result) => {
                switch (result.index) {
                    case 0: // To view your balance
                        showBalance();
                        break;

                    case 1: // To add amount to your balance
                        addBalancePromt()
                        break;

                    case 2: // To view your basic tariff package
                        viewBasicTarrifPackage();
                        break;

                    case 3: // To add addon channel to your tariff package
                        addAddonChannel();
                        break;

                    case 4: // To remove the channel from your tariff plan
                        deleteChannel();
                        break;
                    default:
                        break;
                }
            }).catch((err) => {
                response.error(err);
            })
    })

}

/**
 * function continuePromt
 * To keep the user engage, we will call this function everytime after the end of the questions
 */
let continuePromt = () => {
    prompt.showInputField('Would you like to continue? (y/n)').then((result) => {
        if (result == 'y') {
            showMainQuestion();
        } else {
            process.exit();
        }
    }).catch((err) => {
        response.error(err);
    })
}

/**
 * function showBalance
 * Show user's current balance
 */
let showBalance = () => {
    response.success('Your balance is: ' + userObj.getBalance())
    continuePromt();
}

/**
 * function addBalancePromt
 * Allow user to type an amount which will be added into his/her balance
 */
let addBalancePromt = () => {
    prompt.showInputField('Type amount').then((result) => {

        /**
         * Validate user's input before adding balance
         * Show user's current balance after adding new balance for better experience
         */
        if (validate.validateUserBalance(result)) {
            userObj.addBalance(result); // Add balance into user's account
            response.success('Balance Added');
            showBalance();
        } else {
            // If user added incorrect amount, again ask user type a valid amount
            response.success('Please enter correct amount.');
            addBalancePromt();
        }

    }).catch((err) => {
        response.error(err);
    })
}

/**
 * function viewBasicTarrifPackage
 * To show user's current channels
 */
let viewBasicTarrifPackage = () => {

    // Create an array of category. Category id as key and category name as value
    // Created this array to show category along with channel
    let category = [];
    data.categories.map((cat) => {
        category[cat.id] = cat.name
    });

    // Show current channel of the user
    response.success('You have below channels:');
    userObj.viewChannels().forEach((channel) => {
        response.success(channel.name + ' (' + category[channel.category] + ')');
    })

    continuePromt();
}

/**
 * function addAddonChannel
 * Add new channel into user's tariff
 */
let addAddonChannel = () => {

    // Create array of category name to provide a choise to user
    let category_list = [];

    // Create array of category where name will be key and id will be value
    let category_name = [];

    // Filter category which is not basic
    // Default, we are assiging basic channels to the user
    data.categories.filter((cat) => {
        return cat.is_basic_pack == 0
    }).map((cat) => {
        category_list.push(cat.name)
        category_name[cat.name] = cat.id
    });

    // Show category choises
    prompt.showChoices('Please select a category', category_list).then((result) => {

        // Get category id from array of category_name
        // We will show/filter channels of this specific category
        let category_id = category_name[result.value];

        // Create an array channel_list to show choises of channel
        let channel_list = [];

        // Create an array of channel name where key as channel name and value as channel object
        let channel_name = [];

        // Get list of channels for selected category
        // Along with it, create array of channel list and channel name
        data.channels.filter((channel) => {
            return category_id == channel.category
        }).map((channel) => {
            channel_list.push(channel.name);
            channel_name[channel.name] = channel;
        })

        // Show channel choises
        prompt.showChoices('Please select a channel', channel_list).then((result) => {
            let selected_channel = channel_name[result.value]; // Get channel object
            response.success(userObj.addChannel(selected_channel)); // Add channel into user's tariff
            continuePromt();
        }).catch((err) => {
            response.error(err);
        })
    }).catch((err) => {
        response.error(err);
    })
}

/**
 * function deleteChannel
 * To delete channel from user's tariff
 */
let deleteChannel = () => {

    // Show prompt to enter channel name
    prompt.showInputField('Enter a channel name to delete').then((result) => {

        // Validate user's input for channel
        if (validate.validateChannelName(result)) {
            response.success(userObj.deleteChannel(result)); // Delete channel
            continuePromt();
        } else {
            response.error('Please enter valid channel name')
            deleteChannel()
        }

    }).catch((err) => {
        response.error(err);
    })
}

/**
 * Only export showMainQuestion function as we do not required other function to be called outside of this file
 */
module.exports = {
    showMainQuestion: showMainQuestion
}