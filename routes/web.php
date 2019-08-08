<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Route::group(['namespace' => 'Sponsor', 'prefix' => 'spons'], function() {
    Route::resource('/sponsor', 'SponsorController');
//   Route::delete('/delete', 'SponsorController@destroy');

//    Route::get('/sponsor', 'SponsorController@search')->name('search');
    Route::post('/sponsor', 'SponsorController@doSearch')->name('sponsor');

//});
