import $ from "jquery";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('metadata.js');

    },
    finalize() {


        let _getCookie = (name) => {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // Adiciona metadados nos formularios de cadastro

        let addField = function () {
            // cadastro / cadastro no checkout
            let form = $('#signup-form, .AccountRegisterRoute .wd-profile-register form');
            if (form.length < 1){
                return setTimeout(addField, 500);
            }

            let traffic_source = _getCookie('__trf.src');

            if (!traffic_source){
                return console.log('abort: empty traffic_source');
            }

            // checkout
            if( $('.EasyCheckoutStep').length ){

                // traffic_source
                form.append('<input class="traffic_source" type="hidden" name="AddOrSetCustomer.ExtendedProperties[1].EntityMetadataID" value="5">');
                form.append('<input class="traffic_source" type="hidden" name="AddOrSetCustomer.ExtendedProperties[1].Name" value="traffic_source">');
                form.append(`<input class="traffic_source" type="hidden" name="AddOrSetCustomer.ExtendedProperties[1].Value" value="${traffic_source}">`);
            }else{
                // cadastro
                $('.input-wrapper-traffic_source input').attr('value', traffic_source);
            }

            console.log('metadata added: traffic_source');

        }
        addField();

    },

};
