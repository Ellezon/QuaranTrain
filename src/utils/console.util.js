export default (type, content, extra = '') => {
    const color = type === 'agora'
        ? `color: white; background: blue;`
        : type === 'analytics'
            ? `color: white; background: #fc9600;`
            : type === 'GE'
                ? `color: white; background: #689f38;`
                : type === 'video'
                    ? `color: white; background: #d32f2f;`
                    : `color: white; background: #6a1b9a;`;

    // eslint-disable-next-line no-console
    console.log(
        `%c${type}%c ${content}`,
        `font-weight: bold; padding: 0 5px; ${color} border-radius: 10px; `,
        'font-weight: bold;',
        extra,
    );
};
