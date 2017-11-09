import React, { Component } from 'react';
import { mockContent } from 'mockContent';
import Article from 'views/Article';

class Dashboard extends Component {
  render() {
    const articles = [];
    mockContent.forEach((article, index) => {
      articles.push (
        <Article
          key={ index }
          img={ article.img }
          name={ article.name }
          description={ article.description }
        />
      );
    });

    return (
      <div className='grid__cell col-10/12 dashboard'>
        <h1>Latest articles</h1>
        <div className='article__container'>
          { articles }
        </div>
      </div>
    );
  }
}

export default Dashboard;
