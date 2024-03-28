import React from 'react';

class CanvasAscii extends React.Component<{}> {
    canvasRef?: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}) {
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount(): void {
        if (this.canvasRef && this.canvasRef.current) {
            const canvas = this.canvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) {
                return;
            }
    
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
            const font = '16px monospace';
            const columns = canvas.width / 16;
    
            const drops: number[] = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
    
            const draw = () => {
                context.fillStyle = 'rgba(0, 0, 0, 0.05)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = '#f7f7f7';
                context.font = font;
    
                for (let i = 0; i < drops.length; i++) {
                    const text = String.fromCharCode(Math.floor(Math.random() * 128));
                    const x = i * 16;
                    const y = drops[i] * 16;
                    context.fillText(text, x, y);
                    if (y > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            };
    
            setInterval(draw, 33);
        }
    }

    render(): React.ReactNode {
        return (
            <canvas className="fixed block -z-10 opacity-40" ref={this.canvasRef} />
        );
    }
}

export default CanvasAscii;