<script lang="ts">
    export let isPlaying = false;
    export let coverUrl = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400";
</script>

<div class="vinyl-container {isPlaying ? 'playing' : ''}">
    <div class="vinyl-record">
        <div class="vinyl-grooves"></div>
        <div class="vinyl-label">
            <img src={coverUrl} alt="Album Cover" />
            <div class="vinyl-hole"></div>
        </div>
    </div>
    
    <!-- Stylized tonearm (optional, for aesthetics) -->
    <div class="tonearm">
        <div class="tonearm-base"></div>
        <div class="tonearm-arm"></div>
        <div class="tonearm-head"></div>
    </div>
</div>

<style lang="scss">
    .vinyl-container {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
        perspective: 1000px;
        
        &.playing {
            .vinyl-record {
                animation: spin 4s linear infinite;
            }
            .tonearm {
                transform: rotate(20deg);
            }
        }
    }

    .vinyl-record {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle, #1a1a1a 40%, #0d0d0d 60%, #1a1a1a 80%, #0a0a0a 100%);
        box-shadow: 
            inset 0 0 10px rgba(255, 255, 255, 0.1),
            0 5px 15px rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.5s ease;
        transform-style: preserve-3d;
        
        &::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 50%;
            background: conic-gradient(
                from 0deg, 
                rgba(255,255,255,0.05) 0deg, 
                rgba(255,255,255,0) 45deg,
                rgba(255,255,255,0.1) 90deg, 
                rgba(255,255,255,0) 135deg,
                rgba(255,255,255,0.05) 180deg,
                rgba(255,255,255,0) 225deg,
                rgba(255,255,255,0.1) 270deg,
                rgba(255,255,255,0) 315deg,
                rgba(255,255,255,0.05) 360deg
            );
            pointer-events: none;
        }
    }

    .vinyl-grooves {
        position: absolute;
        width: 95%;
        height: 95%;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 
            inset 0 0 0 10px rgba(0, 0, 0, 0.1),
            inset 0 0 0 20px rgba(255, 255, 255, 0.02),
            inset 0 0 0 30px rgba(0, 0, 0, 0.1),
            inset 0 0 0 40px rgba(255, 255, 255, 0.02),
            inset 0 0 0 50px rgba(0, 0, 0, 0.1);
    }

    .vinyl-label {
        position: relative;
        width: 35%;
        height: 35%;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #333;
        z-index: 2;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .vinyl-hole {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15px;
        height: 15px;
        background-color: #0a0a0a; // Match page background
        border-radius: 50%;
        border: 1px solid #111;
        box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
    }

    .tonearm {
        position: absolute;
        top: -10px;
        right: 10px;
        width: 60px;
        height: 180px;
        transform-origin: top center;
        transition: transform 0.5s ease-in-out;
        z-index: 5;
        filter: drop-shadow(2px 5px 5px rgba(0,0,0,0.5));
    }

    .tonearm-base {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #444, #222);
        border-radius: 50%;
        margin: 0 auto;
        border: 2px solid #555;
        box-shadow: inset 0 2px 5px rgba(255,255,255,0.2);
    }

    .tonearm-arm {
        width: 6px;
        height: 140px;
        background: linear-gradient(90deg, #ccc, #fff, #999);
        margin: -10px auto 0;
        border-radius: 3px;
        position: relative;
        z-index: -1;
    }

    .tonearm-head {
        width: 15px;
        height: 25px;
        background: #222;
        border-radius: 2px;
        margin: 0 auto;
        transform: rotate(30deg) translate(-5px, -5px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.5);
        
        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 4px;
            background: #ffde21;
        }
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
