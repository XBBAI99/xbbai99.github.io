$(() => {

// Step 1: Define global variables to contain different data search results
    let centreInfo = [];
    let centreFee = [];
    let centreLicense = [];
    let selectedSchools = [];
    let targetCentreName = '';
    let targetCentreCode = '';

    let targetCentre = {
        centre_name:'',
        centre_code:'',
        organisation_description: '',
        centre_address: '',
        postal_code:'',
        centre_contact_no:'',
        centre_email_address:'',
        weekday_full_day:'',
        extended_operating_hours:'',
        provision_of_transport:'',
        gst_regisration:'',
        scheme_type:'',
        second_languages_offered:'',
        spark_certified:'',
        infant_fee:'',
        playgroup_fee:'',
        pre_nursery_fee:'',
        nursery_fee:'',
        kindergarten1_fee:'',
        kindergarten2_fee:'',
        license_tenure:'',
        license_issue_date:'',
    };

    //obtain data on listing of centres
    const data1 = {
      resource_id: '8dac5d87-1f95-4701-9881-8d03b2af279d', // the resource id
      limit: 200000, // set the search record limit
    };

    //obtain data on school fees of centres
    const data2 = {
      resource_id: '5480fe65-877c-4502-8ff9-4eb8dff125da', // the resource id
      limit: 200000, // set the search record limit
    };

    //obtain data on licenses of centres
    const data3 = {
      resource_id: 'c1bd6081-8e59-4209-9f61-f22eb5d7ea78', // the resource id
      limit: 200000, // set the search record limit
    };

// Step 2: Call API for centre info data, assign it to centreInfo variable
    $.ajax({
        url: 'https://data.gov.sg/api/action/datastore_search',
        data: data1,
        success: function(data) {
            // alert('Total results found: ' + data.result.total);
            centreInfo = data;
            console.log(centreInfo);
        }
    });

    $.ajax({
      url: 'https://data.gov.sg/api/action/datastore_search',
      data: data2,
      success: function(data) {
          // alert('Total results found: ' + data.result.total)
          centreFee = data;
          console.log(centreFee);
      }
    });

    $.ajax({
      url: 'https://data.gov.sg/api/action/datastore_search',
      data: data3,
      success: function(data) {
        // alert('Total results found: ' + data.result.total)
        centreLicense = data;
        console.log(centreLicense);
      }
    });

// Step 3: Search based on school name and put search results into selectedSchools array
    $('form').on('submit', (event)=>{
        event.preventDefault();
        $('#centreInfo').empty();
        selectedSchools = [];

        let inputName = $('#input-box').val().toLowerCase();
        console.log(inputName);

        for (let i = 0; i < centreInfo.result.records.length; i++) {
            if(centreInfo.result.records[i].centre_name.toLowerCase().includes(inputName)){
               selectedSchools.push(centreInfo.result.records[i]);
            }
        };

        console.log(selectedSchools);

//step 4: clear page and show search results
        $('#searchBar').remove(); //clear page
        $('.container').empty(); //clear page

        for (let i = 0; i < selectedSchools.length; i++) {
            let $centre = $('<div>').addClass('centre');
            $('.container').append($centre);

            let $centreName = $('<div>').text(selectedSchools[i].centre_name).addClass('centreName');
            $centre.append($centreName);

            let $centreInfoList = $('<ul>').addClass('centreInfoList');
            $centre.append($centreInfoList);

            let $centreAddress = $('<li>').text(selectedSchools[i].centre_address);
            $centreInfoList.append($centreAddress);

            let $centreContact=$('<li>').text('Telephone: ' + selectedSchools[i].centre_contact_no);
            $centreInfoList.append($centreContact);

            let $centreEmail=$('<li>').text('Email: ' + selectedSchools[i].centre_email_address);
            $centreInfoList.append($centreEmail);
        };

//Step 5: click a centre name and show further information
        $('.centreName').on('click', (event)=> {
            targetCentreName = $(event.currentTarget).text().toLowerCase();
            console.log(targetCentreName);

            // find the target school in selectedSchools array and obtain the required information
            for (let i = 0; i < selectedSchools.length; i++) {
                if (targetCentreName == selectedSchools[i].centre_name.toLowerCase()){
                    targetCentre.centre_name = selectedSchools[i].centre_name;
                    targetCentre.centre_code = selectedSchools[i].centre_code;
                    targetCentre.organisation_description = selectedSchools[i].organisation_description;
                    targetCentre.centre_address = selectedSchools[i].centre_address;
                    targetCentre.postal_code = selectedSchools[i].postal_code;
                    targetCentre.centre_contact_no = selectedSchools[i].centre_contact_no;
                    targetCentre.centre_email_address = selectedSchools[i].centre_email_address;
                    targetCentre.weekday_full_day = selectedSchools[i].weekday_full_day;
                    targetCentre.extended_operating_hours = selectedSchools[i].extended_operating_hours;
                    targetCentre.provision_of_transport = selectedSchools[i].provision_of_transport;
                    targetCentre.gst_regisration = selectedSchools[i].gst_regisration;
                    targetCentre.scheme_type = selectedSchools[i].scheme_type;
                    targetCentre.second_languages_offered = selectedSchools[i].second_languages_offered;
                    targetCentre.spark_certified = selectedSchools[i].spark_certified;
                }
            };

            // obtain school fee information in centreFee array for targetSchool
            for (let i = 0; i < centreFee.result.records.length; i++) {
                if (targetCentre.centre_code == centreFee.result.records[i].centre_code && centreFee.result.records[i].type_of_citizenship == 'SC' && centreFee.result.records[i].type_of_service == 'Full Day') {
                    if (centreFee.result.records[i].levels_offered == 'Infant (2 to 18 mths)') {
                        targetCentre.infant_fee = centreFee.result.records[i].fees;
                    } else if (centreFee.result.records[i].levels_offered == 'Playgroup (18 mths to 2 yrs old)') {
                        targetCentre.playgroup_fee = centreFee.result.records[i].fees;
                    } else if (centreFee.result.records[i].levels_offered == 'Pre-Nursery (3 yrs old)') {
                        targetCentre.pre_nursery_fee = centreFee.result.records[i].fees;
                    } else if (centreFee.result.records[i].levels_offered == 'Nursery (4 yrs old)') {
                        targetCentre.nursery_fee = centreFee.result.records[i].fees;
                    } else if (centreFee.result.records[i].levels_offered == 'Kindergarten 1 (5 yrs old)') {
                        targetCentre.kindergarten1_fee = centreFee.result.records[i].fees;
                    } else if (centreFee.result.records[i].levels_offered == 'Kindergarten 2 (6 yrs old)') {
                        targetCentre.kindergarten2_fee = centreFee.result.records[i].fees;
                    }
                }
            };

            if (targetCentre.infant_fee == '') {
                targetCentre.infant_fee ='N/A';
            }

            // obtain centre license information in centreLicense array for targetSchool
            for (let i = 0; i < centreLicense.result.records.length; i++) {
                if (targetCentre.centre_code == centreLicense.result.records[i].centre_code) {
                    targetCentre.license_tenure = centreLicense.result.records[i].license_tenure;
                    targetCentre.license_issue_date = centreLicense.result.records[i].license_issue_date;
                }
            };
            console.log(targetCentre);
            $('.centre').remove(); //clear page

            let $targetCentre = $('<div>').addClass('targetCentre');
            $('.container').append($targetCentre);

            let $flexContainer = $('<div>').addClass('flex');
            $('.container').append($flexContainer);

            let $targetCentreName = $('<div>').text(targetCentre.centre_name).addClass('targetCentreName');
            $targetCentre.append($targetCentreName);

            let $targetCentreInfo = $('<div>').addClass('targetCentreInfo');
            $targetCentre.append($targetCentreInfo);

            let $targetCentreAddress = $('<div>').text(targetCentre.centre_address).addClass('targetCentreInfoItem');
            $targetCentreInfo.append($targetCentreAddress);

            let $targetCentreContact=$('<div>').text('Telephone: ' + targetCentre.centre_contact_no).addClass('targetCentreInfoItem');
            $targetCentreInfo.append($targetCentreContact);

            let $targetCentreEmail=$('<div>').text('Email: ' + targetCentre.centre_email_address).addClass('targetCentreInfoItem');
            $targetCentreInfo.append($targetCentreEmail);

            //put in information for column1
            $column1 = $('<div>').addClass('column column1');
            $column1Title = $('<div>').text('School Operation').addClass("columnTitle");
            $targetCentreWeekday = $('<div>').text('Weekday Operating Hours: '+ targetCentre.weekday_full_day);
            $targetCentreExtended = $('<div>').text('Extended Hours: '+ targetCentre.extended_operating_hours);
            $targetCentreTransport = $('<div>').text('Transport Service: ' + targetCentre.provision_of_transport);
            $targetCentreGST = $('<div>').text('GST Charge: '+ targetCentre.gst_regisration);
            $targetCentreScheme = $('<div>').text('Extra Financial Support: ' + targetCentre.scheme_type);
            $targetCentreLanguage = $('<div>').text('Second Language Offered: '+ targetCentre.second_languages_offered);
            $flexContainer.append($column1);
            $column1.append($column1Title);
            $column1.append($targetCentreWeekday);
            $column1.append($targetCentreExtended);
            $column1.append($targetCentreTransport);
            $column1.append($targetCentreGST);
            $column1.append($targetCentreScheme);
            $column1.append($targetCentreLanguage);

            //put in information for column2
            $column2 = $('<div>').addClass('column column2');
            $column2Title = $('<div>').text('School Fee').addClass("columnTitle");
            $targetCentreInfantFee = $('<div>').text('Infant Care Fee: ' + targetCentre.infant_fee);
            $targetCentrePlaygroupFee = $('<div>').text('Playgroup Fee: ' + targetCentre.playgroup_fee);
            $targetCentrePrenurseryFee = $('<div>').text('Pre-Nursery Fee: ' + targetCentre.pre_nursery_fee);
            $targetCentreNurseryFee = $('<div>').text('Nursery Fee: ' + targetCentre.nursery_fee);
            $targetCentreKindergarten1Fee = $('<div>').text('Kindergarten 1 Fee: ' + targetCentre.kindergarten1_fee);
            $targetCentreKindergarten2Fee = $('<div>').text('Kindergarten 2 Fee: ' + targetCentre.kindergarten2_fee);
            $flexContainer.append($column2);
            $column2.append($column2Title);
            $column2.append($targetCentreInfantFee);
            $column2.append($targetCentrePlaygroupFee);
            $column2.append($targetCentrePrenurseryFee);
            $column2.append($targetCentreNurseryFee);
            $column2.append($targetCentreKindergarten1Fee);
            $column2.append($targetCentreKindergarten2Fee);

            //put in information for column3
            $column3 = $('<div>').addClass('column column3');
            $column3Title = $('<div>').text('School License').addClass("columnTitle");
            $targetCentreSpark = $('<div>').text('SPARK Certification: ' + targetCentre.spark_certified);
            $targetCentreLicenseTenure = $('<div>').text('License Tenure: ' + targetCentre.license_tenure);
            $targetCentreLicenseDate = $('<div>').text('License Issue Date: ' + targetCentre.license_issue_date);
            $flexContainer.append($column3);
            $column3.append($column3Title);
            $column3.append($targetCentreSpark);
            $column3.append($targetCentreLicenseTenure);
            $column3.append($targetCentreLicenseDate);

//Step 6: show Google map information of the target centre
            $('.container').append('<div id="map"></div>');
            console.log(targetCentre.centre_address);

            // obtain geocode for the targetCentre address
            // https://developers.google.com/maps/documentation/geocoding/start
            // https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/map-latlng-literal
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD9jp8Lt4dja80ZDfdtXzcGMCs5hOfmuVE&callback=initMap',
                data: {address:targetCentre.centre_address}, //source is the targetCentre address
                success: function(data) {
                    let geo = data;
                    targetCentre.geo_location = geo.results[0].geometry.location;
                    console.log(geo);
                    console.log(targetCentre.geo_location);

                    let map = new google.maps.Map(document.getElementById('map'), {
                    center: targetCentre.geo_location,
                    zoom: 15
                    });

                    let marker = new google.maps.Marker({
                    position: targetCentre.geo_location,
                    map: map,
                    title: targetCentre.centre_name
                    });
                }
            });
        });
    });
});