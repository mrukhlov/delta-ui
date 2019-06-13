import React from 'react';
import { lorem } from './lorem';

import './index.scss';

class Knowledge extends React.Component {
    render() {
        return (
            <div className="knowledge-main-container">
                <div className="knowledge-article">
                    <div className="knowledge-article-header">
                        <h1>Translation Process Overview</h1>
                    </div>
                    <div className="knowledge-article-text">
                        {lorem}
                    </div>
                    <div className="knowledge-article-image">
                        <img src="https://via.placeholder.com/940x300?text=+" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Knowledge;
