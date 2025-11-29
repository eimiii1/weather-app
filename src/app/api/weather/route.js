export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        if (!city) {
            return Response.json({ error: "City parameter is required." }, { status: 400 })
        }

        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric&include=current`

        const response = await fetch(url);
        if (!response.ok) {
            return Response.json({ error: "Failed to fetch weather data." }, { status: response.status })
        }

        const data = await response.json();
        return Response.json(data, { status: 200 })
    } catch (error) {
        return Response.json({ error: "Internal Server Error." }, { status: 500 })
    }
}