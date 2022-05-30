const base_url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port)
const form = document.forms['input_url']
const btn_loading = document.querySelector('.btn-loading')
const btn_kirim = document.querySelector('.btn-kirim')
const hasil = document.querySelector('bjir')

function copyText() {
    document.getElementById('hasilnye').select()
    document.execCommand('copy')
}

function copyText2() {
    document.getElementById('hasilnye_delete').select()
    document.execCommand('copy')
}

function alert_gagal(result) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> ${result.message}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

    hasil.append(wrapper)
}


$( "#copy" ).click(function() {
  alert( "Copied." );
  copyText()
});
$( "#copy2" ).click(function() {
  alert( "Copied." );
  copyText2()
});
function alert_success(result) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
                                   <div class="col-12">
                                            <div class="form-group has-icon-left">
                                                <label for="mobile-id-icon">Result</label>
                                                <div class="position-relative">
                                                    <input type="text" id='hasilnye' class="form-control" placeholder="" value="${base_url + '/'+ result.result.id}"
                                                        id="mobile-id-icon" readonly>
                                                    <div class="form-control-icon">
                                                        <i class="bi bi-clipboard" id="copy"></i>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group has-icon-left">
                                                <label for="password-id-icon">Delete Url</label>
                                                <div class="position-relative">
                                                    <input type="text" id="hasilnye_delete" class="form-control" placeholder="" value="${base_url + '/delete/'+ result.result.delete}" readonly
                                                        id="password-id-icon">
                                                    <div class="form-control-icon">
                                                        <i class="bi bi-clipboard" id="copy2"></i>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>







`

    hasil.append(wrapper)
}
$('#form-input').submit(function (e) {
    e.preventDefault()
    btn_loading.classList.toggle('d-none');
    btn_kirim.classList.toggle('d-none');
    $.ajax({
        type: "POST",
        url: base_url + '/create',
        timeout: 30000,
        data: {
            url: $('#url').val(),
            costum: $('#costum').val()
        },
        dataType: "json",
        success: function (response) {
            btn_loading.classList.toggle('d-none');
            btn_kirim.classList.toggle('d-none');
            alert_success(response)
            form.reset();
            console.log('Success!', response);
        },
        error: function (err) {
            console.log(err.responseJSON)
            btn_loading.classList.toggle('d-none');
            btn_kirim.classList.toggle('d-none');
            alert_gagal(err.responseJSON)
        }
    })
})