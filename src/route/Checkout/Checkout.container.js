import { connect } from 'react-redux';

import {
    CheckoutContainer as SourceCheckoutContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceRoute/Checkout/Checkout.container';

/** @namespace myApp/Route/Checkout/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace myApp/Route/Checkout/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace myApp/Route/Checkout/Container/CheckoutContainer */
export class CheckoutContainer extends SourceCheckoutContainer {
    // TODO implement logic
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
