import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './TestProgressBar.style';

/** @namespace myApp/Route/TestProgressBar/Component/TestProgressBarComponent */
export class TestProgressBarComponent extends PureComponent {
    static propTypes = {
        renderMyTitle: PropTypes.func.isRequired
    };

    render() {
        const { renderMyTitle } = this.props;
        return (
            <div block="TestProgressBar">
                { /* TODO: Implement render method */ }
                { renderMyTitle }
            </div>
        );
    }
}

export default TestProgressBarComponent;
