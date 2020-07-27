var TracomAcademy = TracomAcademy || {};

TracomAcademy.Grid = function(){
    let me = this;

    let tableColGrp = '';
    let tableHeader = '';
    let tableRows = '';

    //construct table columns
    me.columns.forEach(column => {
        tableColGrp += `<col width='${column.width}%'>`;
        tableHeader += `<th>${column.header}</th>`;

    });

    //load table data
    me.store.forEach(record => {
        tableRows += `<tr>`;
        me.columns.forEach(column => {
            tableRows += `<td>${record[column.dataIndex]}</td>`;
        });
        tableRows += `</tr>`;

    });

    //adding grid buttons
    let addButton = me.componentId + '-add';
    let editButton = me.componentId + '-edit';
    let deleteButton = me.componentId + '-delete';

    const tableView =
        `<div style="overflow-x:auto;">`
            + `<button class="button add" id="${addButton}">Add</button> `
            + `<button class="button edit" id="${editButton}">Edit</button> `
            + `<button class="button delete" id="${deleteButton}">Delete</button>`
        + `</div>`
        + `<div style="overflow-x:auto;">`
            + `<table class="tracom-academy">`
                + `<colgroup>${tableColGrp}</colgroup>`
                + `<thead><tr>${tableHeader}</tr></thead>`
                + `<tbody>${tableRows}</tbody>`
        + `</table></div>`;

    document.getElementById(me.contentRender).innerHTML = tableView;

    document.getElementById(addButton).addEventListener("click", function(){
        TracomAcademy.Form.call(me);
    });

}

TracomAcademy.Form = function(){
   let me = this;

   let form = `<div class="form-container" onsubmit="return false;"><form>`;

   me.form.items.forEach(field => {
        form += `<div class="row">`
            + `<div class="col-25">`
                + `<label for="${field.id}">${field.label}</label>`
            + `</div>`
            + `<div class="col-75">`;

                if (field.type == 'textarea')
                    form += `<textarea id="${field.id}" name="${field.name}" style="height:200px" ></textarea>`;
                else if (field.type == 'select'){
                    form += `<select id="${field.id}" name="${field.name}">`;
                        if (field.options)
                            field.options.forEach(option => {
                                form += `<option value="${option.optionValue}">${option.optionLabel}</option>`;
                            })

                    form += `</select>`;
                }else
                    form += `<input type="${field.type}" id="${field.id}" name="${field.name}"/>`;

            form += `</div>`
        + `</div>`;
   });

   let submitFormBtn = me.form.id + '-submit';
   form += `<div class="row">`
        + `<button type="submit" class="button add" id="${submitFormBtn}">Save</button>`
    + `</div></form>`;

   document.getElementById(me.contentRender).innerHTML = form;

   document.getElementById(submitFormBtn).addEventListener("click", event => {
       event.preventDefault();

       TracomAcademy.FormSave.call(me);

   });


}

TracomAcademy.FormSave = function(){
  var me = this;

  let postData = '';

   me.form.items.forEach(field => {
        postData += `${field.name}=` + encodeURIComponent(document.getElementById(field.id).value) + `&`;
   });

   let xhr = new XMLHttpRequest();

   xhr.onreadystatechange = function(){
    if (xhr.readyState == XMLHttpRequest.DONE){
        if (xhr.status == 200){
            console.log("Successfull");

            let response = eval('(' + xhr.responseText + ')');

            console.log(response);

            me.store = response;

            TracomAcademy.Grid.call(me);

        }else{
            alert('Error ocurred ' + xhr.status);

        }

    }

   }

   xhr.open('post', me.form.url, true);
   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   xhr.send(postData);


}