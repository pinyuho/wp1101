import { checkUser } from '../util'

const Subscription = {
    message: {
        subscribe(parent, { from, to }, { db, pubsub }, info) {
            return pubsub.asyncIterator('message');
        }
    },
};

export default Subscription;
