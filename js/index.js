$(document).ready(function() {
  $('#main-page-div').html(start_main_page);
  display_aa();
  //put website design etc at bottom of main div...
  $("#open-menu").on("click", function() {
    if ($(".nav-text").css("width") == "200px") {
      $(".nav-text").animate({
          width: 0
        },500);
      $(this).removeClass('ion-ios-close-empty').addClass('ion-navicon');
    } 
    else {
      $(".nav-text").animate({
          width: 200
        },500);
      $(this).removeClass('ion-navicon').addClass('ion-ios-close-empty');
      $('.outer').css('border-bottom', '1px solid rgb(36,36,36)');
    } 
  });//open-menu
  
}); //document ready

var start_main_page = `<section class="section">
    <div>
      <h5 class="input-output">Nucleotide Sequence</h5>    
    </div>
    <div class="holds-btns-and-txtarea-div">
      <div class="btns-div">
        <button class="select-btn" id="dna-btn" onclick="activeBtn('#dna-btn','#mrna-btn')">DNA</button>
        <button class="select-btn" id="mrna-btn" onclick="activeBtn('#mrna-btn','#dna-btn')">mRNA</button>
      </div>
      <div class="input-txtarea-div">
        <textarea id="input-txtarea" required placeholder="sequence length must be at least 6 nucleotides"></textarea>
      </div>
    </div>
      <div id="convert-btn-div">
        <button id="convert-btn" onclick="convertBtn(0)">Convert</button>
      </div>
  </section>`

///////////////////
//// FUNCTIONS ////
///////////////////
function dna_to_mrna(dna_param, mrna_param) {
  dna_param = dna_param.toUpperCase();
  mrna_param = dna_param.replace(/T/g, "U");
  //console.log(mrna_param);
  return mrna_param;
}//returns rna_param

function make_mrna_divisible_by_3(mrna_param){
  mrna_param = mrna_param.toUpperCase();
  if ((mrna_param.length-1)%3 ==0){
    mrna_param = mrna_param.slice(0, mrna_param.length-1);
    //console.log(mrna_param, mrna_param.length);
    return mrna_param;
  }
  else if ((mrna_param.length+1)%3==0){
    mrna_param = mrna_param.slice(0, mrna_param.length-2);
    //console.log(mrna_param, mrna_param.length);
    return mrna_param;
  }
  //console.log(mrna_param, mrna_param.length);
  return mrna_param;
}//returns rna_param

function create_reading_frames(mrna_param, mrna_array_param) { 
  mrna_array_param = [];
  mrna_array_param[0] = mrna_param; //reading frame 1
  mrna_array_param[1] = mrna_param.slice(1, mrna_param.length - 2); //reading frame 2
  mrna_array_param[2] = mrna_param = mrna_param.slice(2, mrna_param.length - 1); //reading frame 3

  //console.log(mrna_array_param);
  return mrna_array_param;
}//returns mrna_array_param (reading frames)

function reading_frames_to_codons(mrna_array_param, codons_array_param) {
  codons_array_param = [];
  mrna_array_param.forEach(function(currentVal, index) {
    codons_array_param[index] = currentVal.match(/.{3}/g);
  });
 // console.log(codons_array_param);
  return codons_array_param;
}//returns codons_array_param

function codons_to_aa(codons_array_param, aa_seq_array_param, num) {
  //num= accessing aa denotation
  var amino_acids = {
    UUU: ["Phenylalanine", "Phe", "F"],
    UUC: ["Phenylalanine", "Phe", "F"],
    UUA: ["Leucine", "Leu", "L"],
    UUG: ["Leucine", "Leu", "L"],

    CUU: ["Leucine", "Leu", "L"],
    CUC: ["Leucine", "Leu", "L"],
    CUA: ["Leucine", "Leu", "L"],
    CUG: ["Leucine", "Leu", "L"],

    AUU: ["Isoleucine", "Ile", "I"],
    AUC: ["Isoleucine", "Ile", "I"],
    AUA: ["Isoleucine", "Ile", "I"],
    AUG: ["<span style='background-color: green'>Methionine</span>", "<span style='background-color: green'>Met</span>", "<span style='background-color: green'>M</span>"], //START

    GUU: ["Valine", "Val", "V"],
    GUC: ["Valine", "Val", "V"],
    GUA: ["Valine", "Val", "V"],
    GUG: ["Valine", "Val", "V"],

    UCU: ["Serine", "Ser", "S"],
    UCC: ["Serine", "Ser", "S"],
    UCA: ["Serine", "Ser", "S"],
    UCG: ["Serine", "Ser", "S"],

    CCU: ["Proline", "Pro", "P"],
    CCC: ["Proline", "Pro", "P"],
    CCA: ["Proline", "Pro", "P"],
    CCG: ["Proline", "Pro", "P"],

    ACU: ["Threonine", "Thr", "T"],
    ACC: ["Threonine", "Thr", "T"],
    ACA: ["Threonine", "Thr", "T"],
    ACG: ["Threonine", "Thr", "T"],

    GCU: ["Alanine", "Ala", "A"],
    GCC: ["Alanine", "Ala", "A"],
    GCA: ["Alanine", "Ala", "A"],
    GCG: ["Alanine", "Ala", "A"],

    UAU: ["Tyrosine", "Tyr", "Y"],
    UAC: ["Tyrosine", "Tyr", "Y"],
    UAA: ["<span style='background-color:red'>STOP</span>", "<span style='background-color:red'>***</span>", "<span style='background-color:red'>*</span>"],
    UAG: ["<span style='background-color:red'>STOP</span>", "<span style='background-color:red'>***</span>", "<span style='background-color:red'>*</span>"],

    CAU: ["Histidine", "His", "H"],
    CAC: ["Histidine", "His", "H"],
    CAA: ["Glutamine", "Gln", "Q"],
    CAG: ["Glutamine", "Gln", "Q"],

    AAU: ["Asparagine", "Asn", "N"],
    AAC: ["Asparagine", "Asn", "N"],
    AAA: ["Lysine", "Lys", "K"],
    AAG: ["Lysine", "Lys", "K"],

    GAU: ["Aspartic acid", "Asp", "D"],
    GAC: ["Aspartic acid", "Asp", "D"],
    GAA: ["Glutamic acid", "Glu", "E"],
    GAG: ["Glutamic acid", "Glu", "E"],

    UGU: ["Cysteine", "Cys", "C"],
    UGC: ["Cysteine", "Cys", "C"],
    UGA: ["<span style='background-color:red'>STOP</span>", "<span style='background-color:red'>***</span>", "<span style='background-color:red'>*</span>"],
    UGG: ["Tryptophan", "Trp", "W"],

    CGU: ["Arginine", "Arg", "R"],
    CGC: ["Arginine", "Arg", "R"],
    CGA: ["Arginine", "Arg", "R"],
    CGG: ["Arginine", "Arg", "R"],

    AGU: ["Serine", "Ser", "S"],
    AGC: ["Serine", "Ser", "S"],
    AGA: ["Arginine", "Arg", "R"],
    AGG: ["Arginine", "Arg", "R"],

    GGU: ["Glycine", "Gly", "G"],
    GGC: ["Glycine", "Gly", "G"],
    GGA: ["Glycine", "Gly", "G"],
    GGG: ["Glycine", "Gly", "G"]
  };
  aa_seq_array_param = [[], [], []];
  codons_array_param.forEach(function(curVal, inde) {
    codons_array_param[inde].forEach(function(cV, ind) {
      //console.log(curVal, cV);
      aa_seq_array_param[inde][ind] = amino_acids[cV][num];
    }); //second forEach
  }); //first forEach
  $('#main-page-div').data({aa_seq:aa_seq_array_param});
  //console.log(aa_seq_array_param);
  
  return aa_seq_array_param;
}//returns aa_seq_array_param

function display_aa(){
  var aa_card_info = [
    ['Aspartic Acid', 'Asp', 'D', 'polar, negative charge', 'red','https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800394/aspartic_acid_gksjsp.png'],
    ['Glutamic acid', 'Glu', 'E', 'polar, negative charge', 'red','https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/glutamic_acid_ct7zym.png'],
    ['Lysine', 'Lys', 'K', 'polar, positive charge', 'blue', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/lysine_ydtup5.png'],
    ['Arginine', 'Arg', 'R', 'polar, positive charge', 'blue', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800394/arginine_l8eyi3.png'],
    ['Histidine', 'His', 'H', 'polar, positive charge', 'blue', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/histidine_jveqtu.png'],
    ['Serine', 'Ser', 'S', 'polar, uncharged', 'gray', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/serine_fuu6hn.png'],
    ['Threonine', 'Thr', 'T', 'polar, uncharged', 'gray', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/threonine_uhnszn.png'],
    ['Tyrosine', 'Tyr', 'Y', 'polar, uncharged', 'gray', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/tyrosine_cglbrs.png'],
    ['Asparagine', 'Asn', 'N', 'polar, uncharged', 'gray', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800394/asparagine_sk0a1c.png'],
    ['Glutamine', 'Gln', 'Q', 'polar, uncharged', 'gray', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/glutamine_affpde.png'],
    ['Glycine', 'Gly', 'G', 'non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/glycine_sxn39y.png'],
    ['Alanine', 'Ala', 'A','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800394/alanine_rt5wfb.png'],
    ['Valine', 'Val', 'V', 'non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/valine_odiqw8.png'],
    ['Cysteine', 'Cys', 'C','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/cysteine_sciret.png'],
    ['Proline', 'Pro', 'P','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/proline_usrfdp.png'],
    ['Leucine', 'Leu', 'L','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/leucine_uxadfc.png'],
    ['Isoleucine', 'Ile', 'I','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/isoleucine_o2jecr.png'],
    ['Methionine','Met','M','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/methionine_kr22un.png'],
    ['Tryptophan', 'Trp', 'W','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800392/tryptophan_idyxok.png'],
    ['Phenylalanine', 'Phe', 'F','non-polar', 'green', 'https://res.cloudinary.com/dtwopb4fp/image/upload/v1503800393/phenylalanine_cnajjg.png'],
  ];//aa_info_to_display
  
  for (var i = 0; i< aa_card_info.length; i++){
    $("#amino-body-div").append(
      `<div class="aa-card">
      <h4 style="width:180px; border-bottom:2px solid rgb(27, 36, 47)">`+aa_card_info[i][0]+`</h4>
      <h4 style="width:70px; text-align:center;border-left: white 1px solid;border-bottom:2px solid rgb(27, 36, 47)">`+ aa_card_info[i][1]+`</h4>
      <h4 style="width:50px; text-align:center;border-left: white 1px solid;border-bottom:2px solid rgb(27, 36, 47)">`+ aa_card_info[i][2]+`</h4>
      <p class=`+aa_card_info[i][4]+`>`+ aa_card_info[i][3]+`</p>
      <img src=`+ aa_card_info[i][5]+` alt=`+aa_card_info[i][1]+`>
    </div>`
    );/*
    var color = aa_card_info[i][4];
    //console.log(color);
    $('.aa-charge').css({
      'background': color,
      'background': '-webkit-linear-gradient(right top, '+ color+ ', white)',
      'background': '-o-linear-gradient(bottom left, '+ color+ ', white)',
      'background': '-moz-linear-gradient(bottom left, '+ color+ ', white)',
      'background': '-linear-gradient(to bottom left, '+ color+ ', white)'
    });*/
  }//for-loop, var i
  
}//display_aa

function display_output(aa_seq_array_param, input_seq_length_param, num_for_aa_code){
  $('#main-page-div').hide().html(
    `<section class="section">
    <div>
      <h5 class="input-output">Amino Acid Sequence</h5>    
    </div>
    
    <div class="holds-btns-and-output-div">
      <div id="aa-btns-div">
        <button class="select-btn" id="fullaa-btn" onclick="convertBtn(0)">Full Name</button>
        <button class="select-btn" id="Threeaa-btn" onclick="convertBtn(1)">3 Letter Code</button>
        <button class="select-btn" id="Oneaa-btn" onclick="convertBtn(2)">1 Letter Code</button>
      </div>
      <div id="output-div">
          <p>input nucleotide seqeunce length: `+input_seq_length_param+`</p>
      </div>
    </div>
    
      <div id="reset-btn-div">
        <button id="reset-btn" onclick="resetBtn()">Reset</button>
      </div>

  </section>`);
  for (var t = 0; t<aa_seq_array_param.length; t++){
    var aa_seq_string
    if (num_for_aa_code == 0){
      aa_seq_string= aa_seq_array_param[t].join(' - ');
    }
    else if (num_for_aa_code == 1){
      aa_seq_string= aa_seq_array_param[t].join('-');
    }
    else {
      aa_seq_string= aa_seq_array_param[t].join(' ');
    }
    
    $('#output-div').append(
      `<h5>Reading Frame `+(t+1)+`</h5>
        <ul>
            <li>amino acid sequence length: `+aa_seq_array_param[t].length+`</li>
            <li class="seq">`+ aa_seq_string +`</li>  
        </ul>`
    );
  }//for loop i
  $('#main-page-div').show()
}
///////////////////////////////
//// MOST BUTTON FUNCTIONS ////
///////////////////////////////
function toggleNavMenu(idOfMenu, idOfSpan, iconClass, hideThis1, hideThis2, hide1class, hide2class, idOfSpan2Hide1, idOfSpan2Hide2){
  if ($(idOfMenu).css('display') == 'none'){
    $(hideThis1).hide('slide',500);
    $(hideThis2).hide('slide',500);
    $(idOfSpan2Hide1+' .ion').removeClass('ion-ios-close-empty').addClass(hide1class);
    $(idOfSpan2Hide2+' .ion').removeClass('ion-ios-close-empty').addClass(hide2class);
    $(idOfSpan2Hide1+','+ idOfSpan2Hide2).css('background-color','').css('color','').addClass('outer');
    
    
    $(idOfMenu).show('slide', 500);
    $(".nav-text").animate({
          width: 0
        },500);
    $("#open-menu").removeClass('ion-ios-close-empty').addClass('ion-navicon');
    $(idOfSpan).css({'background-color':'rgb(20, 29, 40)','color':'rgb(227, 27, 109)'});
    $(idOfSpan +' .ion').removeClass(iconClass).addClass('ion-ios-close-empty');
  }
  else {
    $(idOfMenu).hide('slide', 500);
    $(".nav-text").animate({
          width: 0
        },500);
    $("#open-menu").removeClass('ion-ios-close-empty').addClass('ion-navicon');
    $(idOfSpan).css('background-color','').css('color','').addClass('outer');
    $(idOfSpan +' .ion').removeClass('ion-ios-close-empty').addClass(iconClass);
  }
}

function activeBtn(activateThis, inactivateThis){
  $(inactivateThis).addClass("select-nt-btn").css("background-color","");
  $(activateThis).css("background-color", "rgba(4, 194, 201,0.5)");
}

  var input_seq_length=0;
  var dna = "";
  var mrna = "";
  var mrna_array = [];
  var codons_array;
  var aa_seq_array;
  var obj ={};

function convertBtn(num_for_aa_code){
  //console.log($('textarea').val().match(/([bdefhijklmnopqrsuvwxyz])/i));
   if ($('.input-output').text() == 'Amino Acid Sequence') {
    //console.log(obj.mrna);
     if (obj.mrna !== undefined){
       display_output(codons_to_aa(reading_frames_to_codons(create_reading_frames(make_mrna_divisible_by_3(mrna), mrna_array), codons_array), aa_seq_array, num_for_aa_code), input_seq_length,num_for_aa_code);
       
     }
     else if (obj.dna !== undefined) {
       display_output(codons_to_aa(reading_frames_to_codons(create_reading_frames(make_mrna_divisible_by_3(dna_to_mrna(dna, mrna)), mrna_array), codons_array), aa_seq_array, num_for_aa_code), input_seq_length,num_for_aa_code);
  }
   }
  
  else if($('#dna-btn').css('background-color') =='rgba(4, 194, 201, 0.5)'&& $('textarea').val().match(/([^actg])/i) == null) {
    dna = ($('textarea').val()); 
    obj.dna = dna;
    input_seq_length = dna.length;
   display_output(codons_to_aa(reading_frames_to_codons(create_reading_frames(make_mrna_divisible_by_3(dna_to_mrna(dna, mrna)), mrna_array), codons_array), aa_seq_array, num_for_aa_code), input_seq_length, num_for_aa_code);
    
    //ATGATCTGCAGTCGATGCTAGCGCTAGCTAGCTAGCTAGCTAGCTGGGTCATCGCTAG length of 58
  }
  else if ($('#mrna-btn').css('background-color') =='rgba(4, 194, 201, 0.5)'&& $('textarea').val().match(/([^acug])/i) == null) {
    mrna=$('textarea').val(); 
    obj.mrna= mrna;
    input_seq_length = mrna.length;
    display_output(codons_to_aa(reading_frames_to_codons(create_reading_frames(make_mrna_divisible_by_3(mrna), mrna_array), codons_array), aa_seq_array, num_for_aa_code), input_seq_length,num_for_aa_code);
    //AUGAUCUGCAGUCGAUGCUAGCGCUAGCUAGCUAGCUAGCUAGCUGGGUCAUCGCUAG length of 58
  }
  else {
    alert("Error. Select the correct nucleotide type and/or input the nucleotide sequence.")
  }
}

function resetBtn(){
  $('#main-page-div').html(start_main_page);
  input_seq_length=0;
  dna = "";
  mrna = "";
  mrna_array = [];
  codons_array;
  aa_seq_array;
  obj ={};
}