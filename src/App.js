import React from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import FileRepositoryService from './service/FileRepositoryService';
import Content from './components/Content';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      breadcrumbs: [],
      selectedBreadcrumb: null,
      selectedBreadcrumbName: null,
      selectedBreadcrumbType: null,
      content: []
    };
  }

  async componentDidMount() {
    this.fileRepositoryService = new FileRepositoryService();

    const response = await this.fileRepositoryService.getContents('/');

    this.setState({
      ...this.state,
      breadcrumbs: ['/'],
      selectedBreadcrumb: 0,
      selectedBreadcrumbName: response.name,
      selectedBreadcrumbType: response.type,
      content: response.children || []
    });
  }

  async onBreadcrumbClick(breadcrumb, index) {
      let breadcrumbs;
      let path;

      if (index > 0) {
        breadcrumbs = this.state.breadcrumbs.slice(0, index + 1);
        path = breadcrumbs[0] + breadcrumbs.slice(1, breadcrumbs.length).join('/');
      } else {
        breadcrumbs = ['/'];
        path = breadcrumbs[0];
      }

      const response = await this.fileRepositoryService.getContents(path);

      this.setState({
        ...this.state,
        breadcrumbs,
        selectedBreadcrumb: index,
        selectedBreadcrumbName: response.name,
        selectedBreadcrumbType: response.type,
        content: response.children || []
      });
  }

  async onResourceClick(resource) {
    const breadcrumbs = [...this.state.breadcrumbs, resource.name];
    const path = breadcrumbs[0] + breadcrumbs.slice(1, breadcrumbs.length).join('/');

    const response = await this.fileRepositoryService.getContents(path);

    this.setState({
      ...this.state,
      breadcrumbs,
      selectedBreadcrumb: breadcrumbs.length - 1,
      selectedBreadcrumbName: resource.name,
      selectedBreadcrumbType: resource.type,
      content: response.children || []
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Breadcrumbs breadcrumbs={this.state.breadcrumbs} onClick={(breadcrumb, index) => {
            this.onBreadcrumbClick(breadcrumb, index);
          }} />
          <Content resource={{
            name: this.state.selectedBreadcrumbName,
            type: this.state.selectedBreadcrumbType
          }} content={this.state.content} onClick={(resource) => {
            this.onResourceClick(resource);
          }} />
        </header>
      </div>
    );
  }
}

export default App;
