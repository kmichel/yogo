var sounds = {};
var sound_active = true;
var audioContext = null;

function play_sound(name) {
    if (sound_active && audioContext && name in sounds) {
        var source = audioContext.createBufferSource();
        source.buffer = sounds[name];
        source.connect(audioContext.destination);
        if (source.start)
            source.start(0);
        else if (source.noteOn)
            source.noteOn(0);
    }
}

function is_sound_active() {
    return sound_active;
}

function set_sound_active(active) {
    sound_active = active;
}

if (window.AudioContext || window.webkitAudioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    load_sound = function (url, name) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            audioContext.decodeAudioData(request.response, function (buffer) {
                sounds[name] = buffer;
            }, function () {
                if (window.console && console.log)
                    console.log(arguments);
            });
        };
        request.send();
    };
} else {
    load_sound = function (url, name) {

    };
}

