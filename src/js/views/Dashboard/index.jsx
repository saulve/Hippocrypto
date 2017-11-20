import React, { Component } from 'react';
import { mockContent } from 'mockContent';
import Article from 'views/Article';

const importAll = (r) => {
  return r.keys().map(r);
};

const articleImages = importAll(require.context('../../../assets/img/articles', false, /\.(png|jpg|jpe?g|gif|svg)$/));


class Dashboard extends Component {
  render() {
    const articles = [];
    mockContent.forEach((article) => {
      // Find image object of current article
      const articleImg = articleImages.find((img) => {
        return img.src === article.img;
      });

      articles.push(
        <Article
          key={ articleImg.src }
          imgSrc={ articleImg.src }
          imgSrcSet={ articleImg.srcSet }
          name={ article.name }
          description={ article.description }
        />);
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
