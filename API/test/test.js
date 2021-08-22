const expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
const axios = require("axios");
chai.use(chaiHttp);
let user;
describe("Routes' tests", function () {
    let base_url = "http://localhost:8080/"
    let edit_fields =
        {
            "phone": "14234233",
            "nat": "ARG",
        }
    let search_fields =
        {
            "query": "ARG",
            "type": "nat"
        }
    before( async function () {
         await axios.get(base_url + "users/6122cabcb383423760503bb7")
            .then((response) => {
                user = response.data
            })
    })
    it("should return first 50 users", function (done) {
        chai.request(base_url)
            .get('users')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should get one user", function (done) {
        chai.request(base_url)
            .get('users/'+ user.user._id)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should edit the user", function (done) {
        chai.request(base_url)
            .put('users/'+ user.user._id)
            .send(edit_fields)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.user.phone).to.equal(edit_fields.phone)
                expect(res.body.user.nat).to.equal(edit_fields.nat)
                done();
            });
    });

    it("should get the user using search parameters", function (done) {
        chai.request(base_url)
            .post('search_user/')
            .send(search_fields)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should delete the user", function (done) {
        chai.request(base_url)
            .delete('users/'+ user.user._id)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    after( () => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        axios.post(base_url + "users", user)
            .then((response) => {
            })
    })


});


