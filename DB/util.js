module.exports =  {
    formatId: function(str, desc, minlength, preStr) {
        if (str.length < minlength) {
            return (preStr || '') + desc.substr(0, minlength-str.length) + str;
        } else {
            return (preStr || '') + str;
        }
    }
}