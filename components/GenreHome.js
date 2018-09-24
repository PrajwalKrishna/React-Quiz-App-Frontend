import React, { Component } from 'react';
import '../Stylesheet/ViewGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewGenres extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
