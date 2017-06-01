import Raven from 'raven-js';

/**
 * https://docs.sentry.io/clients/javascript/integrations/react/
 * @param err
 * @param context
 */
export const logException = (err, context) => {
    Raven.captureException(err, {
        extra: context
    });
    /* eslint no-console:0 */
    window.console && console.error && console.error(err);
};
