import {
    BILLING_STEP,
    // CHECKOUT_URL,
    DETAILS_STEP,
    SHIPPING_STEP
} from '@scandipwa/scandipwa/src/route/Checkout/Checkout.config';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

import ContentWrapperComponent from 'Component/ContentWrapper/ContentWrapper.component';
import LoaderComponent from 'Component/Loader/Loader.component';
import TestProgressBarComponent from 'Route/TestProgressBar/TestProgressBar.component';
import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component';
import { addressType } from 'Type/Account';
import { paymentMethodsType, shippingMethodsType } from 'Type/Checkout';
import { HistoryType } from 'Type/Common';
import { TotalsType } from 'Type/MiniCart';

import './Checkout.extension.style.scss';

/** @namespace myApp/Route/Checkout/Component/CheckoutComponent */
export class CheckoutComponent extends SourceCheckout {
  static propTypes = {
      setLoading: PropTypes.func.isRequired,
      setDetailsStep: PropTypes.func.isRequired,
      shippingMethods: shippingMethodsType.isRequired,
      onShippingEstimationFieldsChange: PropTypes.func.isRequired,
      setHeaderState: PropTypes.func.isRequired,
      paymentMethods: paymentMethodsType.isRequired,
      saveAddressInformation: PropTypes.func.isRequired,
      savePaymentInformation: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      isDeliveryOptionsLoading: PropTypes.bool.isRequired,
      shippingAddress: addressType.isRequired,
      billingAddress: addressType.isRequired,
      estimateAddress: addressType.isRequired,
      checkoutTotals: TotalsType.isRequired,
      orderID: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isEmailAvailable: PropTypes.bool.isRequired,
      selectedShippingMethod: PropTypes.string.isRequired,
      history: HistoryType.isRequired,
      onEmailChange: PropTypes.func.isRequired,
      paymentTotals: TotalsType,
      checkoutStep: PropTypes.oneOf([
          SHIPPING_STEP,
          BILLING_STEP,
          DETAILS_STEP
      ]).isRequired,
      isCreateUser: PropTypes.bool.isRequired,
      onCreateUserChange: PropTypes.func.isRequired,
      onPasswordChange: PropTypes.func.isRequired,
      isGuestEmailSaved: PropTypes.bool.isRequired,
      goBack: PropTypes.func.isRequired,
      totals: TotalsType.isRequired,
      isMobile: PropTypes.bool.isRequired,
      cartTotalSubPrice: PropTypes.number.isRequired,
      onShippingMethodSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
      paymentTotals: {}
  };

  stepMap = {
      [SHIPPING_STEP]: {
          number: 1,
          title: __('Personal information'),
          url: '/shipping',
          render: this.renderShippingStep.bind(this),
          areTotalsVisible: true
      },
      [BILLING_STEP]: {
          number: 2,
          title: __('Payment'),
          url: '/billing',
          render: this.renderBillingStep.bind(this),
          areTotalsVisible: true
      },
      [DETAILS_STEP]: {
          title: __('Thank you for your purchase!'),
          mobileTitle: __('Order details'),
          url: '/success',
          render: this.renderDetailsStep.bind(this),
          areTotalsVisible: false
      }
  };

  stepsCount = 2;

  renderTitle() {
      const { checkoutStep, totals: { is_virtual } } = this.props;
      const { title = '', number } = this.stepMap[checkoutStep];

      if (is_virtual || !number) {
          return (
        <div block="Checkout" elem="Header">
          <div block="Checkout" elem="Title">{ title }</div>
        </div>
          );
      }

      return (
      <div block="Checkout" elem="ProgressSection">
        <div block="Checkout" elem="Header">
          <div block="Checkout" elem="Title">{ title }</div>
        </div>
      </div>
      );
  }

  renderMyTitle() {
      const { checkoutStep, totals: { is_virtual } } = this.props;
      const { title = '', number } = this.stepMap[checkoutStep];

      if (is_virtual || !number) {
          return (
            <div block="Checkout" elem="Header">
              <div block="Checkout" elem="Title">{ title }</div>
            </div>
          );
      }
      // <div block="Checkout" elem="Header">
      // </div>
      // <div block="Checkout" elem="Step">
      // </div>
      // <span block="Checkout" elem="SelectedStep">{ number }</span>
      // <span block="Checkout" elem="StepsBorder">/</span>
      // <span block="Checkout" elem="TotalSteps">{ this.stepsCount }</span>

      return (
        <div block="Checkout" elem="ProgressSection">
            <div block="Checkout" elem="StepBarTotal" />
          { this.renderBlockActive(number) }
          { this.renderBlockOne(number) }
          { this.renderBlockTwo(number) }
        </div>
      );
  }

  renderBlockActive(number) {
      if (number === 1) {
          return <div block="Checkout" elem="StepBarActive" mods={ { isFirst: number === 1 } } />;
      }
      if (number === 2) {
          return <div block="Checkout" elem="StepBarActive" mods={ { isSecond: number === 2 } } />;
      }

      return null;
  }

  renderBlockOne(number) {
      const stagesNames = ['Shipping', 'Review & Payments'];
      if (number === 1) {
          return (
              <>
          <div block="Checkout" elem="NextStep" mods={ { isFirst: number === 1 } }>
            { this.renderNumber(number) }
          </div>
          <div block="Checkout" elem="NextStep" mods={ { isSecond: number === 1 } }>
            { this.renderNumber(number + 1) }
          </div>
          <div className="Checkout-stage-name">{ stagesNames[number - 1] }</div>
          <div className="Checkout-stage-name">{ stagesNames[number] }</div>
              </>
          );
      }

      return null;
  }

  renderBlockTwo(number) {
      const stagesNames = ['Shipping', 'Review & Payments'];
      if (number === 2) {
          return (
              <>
                <div block="Checkout" elem="NextStep" mods={ { isFirst: number === 2 } }>
                  <div className="Checkout-Stage">&#10004;</div>
                </div>
                <div block="Checkout" elem="NextStep" mods={ { isSecond: number === 2 } }>
                  { this.renderNumber(number) }
                </div>
                <div className="Checkout-stage-name">{ stagesNames[number - 2] }</div>
                <div className="Checkout-stage-name">{ stagesNames[number - 1] }</div>
              </>
          );
      }

      return null;
  }

  renderNumber(number) {
      return (
        <div className="Checkout-Stage">
          { number }
        </div>
      );
  }

  render() {
      return (
          <main block="Checkout">
            <TestProgressBarComponent renderMyTitle={ this.renderMyTitle() } />
              <ContentWrapperComponent
                wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                label={ __('Checkout page') }
              >
                  { this.renderSummary(true) }
                  <div block="Checkout" elem="Step">
                      { this.renderTitle() }
                      { this.renderGuestForm() }
                      { this.renderStep() }
                      { this.renderLoader() }
                  </div>
                  <div>
                  <Suspense fallback={ <LoaderComponent /> }>
                      { this.renderSummary() }
                      { this.renderPromo() }
                  </Suspense>
                  </div>
              </ContentWrapperComponent>
          </main>
      );
  }
}

export default CheckoutComponent;
