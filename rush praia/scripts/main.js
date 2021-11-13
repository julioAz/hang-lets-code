// import external dependencies
import 'jquery';

// Import everything from autoload
// import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import customsearch from "./routes/search";
import homeroute from './routes/home';
import colecoes from './routes/colecoes';
import product from './routes/product';
import basket from './routes/BasketIndexRoute';
import categoryBase from "./routes/categoryBase";

// add metadata to routes
import metadata from './routes/metadata';


/** Populate Router instance with DOM routes */
const routes = new Router({
    common,
    colecoes,
    homeroute,
    customsearch,
    'phProduct': product,
    'pageBasket': basket,
    'contextCategory111': categoryBase,
    accountregisterroute: metadata, // cadastro
    easycheckoutstep: metadata // cadastro no checkout
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
