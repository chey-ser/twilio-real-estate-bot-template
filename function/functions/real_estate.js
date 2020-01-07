exports.handler = async(context, event, callback) =>{
    
    const {CurrentTask} = event;

    //calling task handlers
    switch(CurrentTask){

        case 'greeting' :
            await greetingTaskHandler(context, event, callback);
            break;

        case 'get_available_listings' :
            await getAvailableListingsTaskHandler(context, event, callback);
            break;

        case 'complete_scheduling' :
            await completeSchedulingTaskHandler(context, event, callback);
            break;

        case 'get_pets_policy' :
            await getPetsPolicyTaskHandler(context, event, callback);
            break;

        case 'get_rent' :
            await getRentTaskHandler(context, event, callback);
            break;

        case 'schedule_open_house' :
            await scheduleOpenHouseTaskHandler(context, event, callback);
            break;

        case 'goodbye' :
            await goodbyeTaskHandler(context, event, callback);
            break;

        case 'collect_fallback' :
            await collectFallbackTaskHandler(context, event, callback);
            break;

        case 'fallback' :
            await fallbackHandler(context, event, callback);
            break;

        default :
            await fallbackHandler(context, event, callback);
    } 
};

//greeting handler function
const greetingTaskHandler = async (context, event, callback) => {

    const Say = 'Hello, I can help schedule an open house, tell you about the apartments we have available and answer questions about our policies. What can I help you with today?',
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//get_available_listings handler function
const getAvailableListingsTaskHandler = async (context, event, callback) => {

    const Say = `We have four studios, two 1 bedroom apartments and three 2 bedroom apartments available for rent right now. Can I help with anything else?`,
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//complete_scheduling handler function
const completeSchedulingTaskHandler = async (context, event, callback) => {

    const Say = `Great I've booked a viewing for you. Is there anything else I can help with?`,
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//get_pets_policy handler function
const getPetsPolicyTaskHandler = async (context, event, callback) => {

    const Say = `We allow cats with an additional rent of $250/month and a one-time $500 deposit. Unfortunately, we do not allow dogs. Can I help with anything else?`,
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//get_rent handler function
const getRentTaskHandler = async (context, event, callback) => {

    const Say = "The rent for our 1 bedrooms starts from $2000/month and $3000/month for our 2 bedrooms. We also require a deposit equal to one month's rent. Is there anything else I can help with?",
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//schedule_open_house handler function
const scheduleOpenHouseTaskHandler = async (context, event, callback) => {

    const Say = "Okay lets schedule a viewing for you. I just need you to answer a few questions.",
          Listen = false,
          Collect = {
            "on_complete" : {
                "redirect" : "task://complete_scheduling"
            },
            "name" : "schedule_open_house",
            "questions" : [
                {
                    "type" : "Twilio.DATE",
                    "question" : "What date do you want to come visit?",
                    "name" : "open_house_date"
                },
                {
                    "type" : "Twilio.TIME",
                    "question" : "Thanks, what time would you like to come in?",
                    "name" : "open_house_time"
                },
                {
                    "type" : "Twilio.FIRST_NAME",
                    "question" : "Thanks, what's the name of the person attending?",
                    "name" : "open_house_name"
                },
                {
                    "type" : "Twilio.PHONE_NUMBER",
                    "question" : "Awesome, last question. What is the best number to reach you at?",
                    "name" : "open_house_phone_number"
                }
            ]
        };

    speechOut(Say, Listen, Collect, callback);
}

//goodbye handler function
const goodbyeTaskHandler = async (context, event, callback) => {

    const Say = "Thank you! Please reach out again if you need anything. Goodbye.",
          Listen = false,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//collect_fallback handler function
const collectFallbackTaskHandler = async (context, event, callback) => {

    const Say = "Looks like I'm having trouble. Apologies for that. Let's start again, how can I help you today?",
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

//fallback handler function
const fallbackHandler = async (context, event, callback) => {

    const Say = "I'm sorry didn't quite get that. Please say that again.",
          Listen = true,
          Collect = false;

    speechOut(Say, Listen, Collect, callback);
}

/** 
 * speech-out function 
 * @Say {string}             // message to speak out
 * @Listen {boolean}         // keep session true or false
 * @Remember {object}        // save data in remember object 
 * @callback {function}      // return twilio function response 
 * */ 
const speechOut = (Say, Listen, Collect, callback) => {

    let responseObject = {
		"actions": []
    };

    if(Say)
        responseObject.actions.push(
            {
				"say": {
					"speech": Say
				}
			}
        );

    if(Listen)
        responseObject.actions.push(
            { 
                "listen": true 
            }
        );

    if(Collect)
        responseObject.actions.push(
            {
                "collect" : Collect
            }
        );

    // return twilio function response
    callback(null, responseObject);
}