const mongoose  	= require('mongoose');
const chai      	= require('chai');
const should    	= chai.should();
const chaiHttp  	= require('chai-http');
const app   		= require('../app');
const modelExemple 	= require('../models/model.exemple');
const Exemple  		= modelExemple

chai.use(chaiHttp);

describe('SIMPLE TEST API', () => {
    let firstDocumentItem = new Exemple({
        key_string: "Hello World",
        key_object: {
            sub_key_number: 42,
            sub_key_string: "Hello World BIS" 
        },
        key_number: 0,
        key_date: new Date(),
        key_array: ["Bonjour le monde", "Hello World", 123],
        key_boolean: true
    });
    /*	
        POST 
    */
    describe('/Post', () => {
        describe('/document ', () => {
            it('Should return an status 200', (done) => {
                chai.request(app)
                .post('/document/')
                .send(firstDocumentItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    documents = res.body
                    done();
                });
            });
        });
    });
    /*	
        GET 
    */
    describe('/Get', () => {
        describe('/picture  | (with empty database)', () => {
            it('Should return an empty array (empty database)', (done) => {
                chai.request(app)
                .get('/document')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });
        });
    });
    /*	
        PUT 
    */
    describe('/PUT', () => {
        firstDocumentItem.key_string = "WORLD HELLO";
        describe('/put/:id', () => {
            it('Should return an status 200', (done) => {
                chai.request(app)
                .put('/document/' +  firstDocumentItem._id)
                .send(firstDocumentItem)
                .end((err, res) => {
                    res.should.have.status(200)
                    done();
                });
            });
        });
    });
    /*
        DEL
    */
    describe('/DEL', () => {
        describe('/document/:id', () => {
            it('Should return an status 204 ', (done) => {
                chai.request(app)
                .del('/document/' + firstDocumentItem._id)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
            });
        });
        describe('/document/:id | try to delete valid id but not exist', () => {
            it('Should return an error status 400 ', (done) => {
                chai.request(app)
                .del('/document/' + firstDocumentItem._id)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
            });
        });
    });
});
