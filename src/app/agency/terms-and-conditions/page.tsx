export default function TermsAndConditions() {
    return (
        <section className="flex flex-col pt-12 w-full max-w-2xl mx-auto gap-6">
            <h1 className="text-3xl font-bold">Términos y Condiciones</h1>

            <div className="text-start space-y-6 prose prose-invert max-w-none">
                <p className="text-sm text-muted">
                    Última actualización:{" "}
                    {new Date().toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        1. Aceptación de los Términos
                    </h2>
                    <p>
                        Al acceder y utilizar nuestros servicios a través de
                        Facebook Messenger y Facebook, usted acepta estar sujeto
                        a estos Términos y Condiciones y a todas las leyes y
                        regulaciones aplicables. Si no está de acuerdo con
                        alguno de estos términos, no debe utilizar nuestros
                        servicios.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        2. Descripción del Servicio
                    </h2>
                    <p>
                        Proporcionamos servicios de conversación y comunicación
                        a través de Facebook Messenger y Facebook. Estos
                        servicios permiten a los usuarios interactuar con
                        nuestras funcionalidades mediante mensajes y
                        conversaciones integradas con las plataformas de
                        Facebook.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Uso Aceptable</h2>
                    <p>
                        Usted acepta utilizar nuestros servicios únicamente para
                        fines legales y de manera que no:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Viole ninguna ley, regulación o derecho de terceros
                        </li>
                        <li>
                            Transmita contenido ilegal, dañino, amenazante,
                            abusivo, hostigador, difamatorio, obsceno o de otra
                            manera objetable
                        </li>
                        <li>
                            Interfiera o interrumpa el funcionamiento de
                            nuestros servicios o servidores
                        </li>
                        <li>
                            Intente obtener acceso no autorizado a nuestros
                            servicios, cuentas de usuario, sistemas informáticos
                            o redes
                        </li>
                        <li>
                            Utilice nuestros servicios para enviar spam,
                            mensajes no solicitados o contenido malicioso
                        </li>
                        <li>Suplante la identidad de otra persona o entidad</li>
                        <li>
                            Recopile información de otros usuarios sin su
                            consentimiento
                        </li>
                        <li>
                            Viole los Términos de Servicio de Facebook o
                            cualquier política aplicable de Facebook
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        4. Integración con Facebook
                    </h2>
                    <p>
                        Nuestros servicios están integrados con Facebook
                        Messenger y Facebook. Al utilizar nuestros servicios,
                        usted también acepta cumplir con los Términos de
                        Servicio de Facebook, las Políticas de la Plataforma de
                        Facebook, y todas las políticas aplicables de
                        Facebook/Meta.
                    </p>
                    <p>
                        Reconocemos que Facebook puede modificar sus políticas y
                        términos en cualquier momento, y que estos cambios
                        pueden afectar cómo operamos nuestros servicios. Nos
                        reservamos el derecho de modificar o discontinuar
                        nuestros servicios para cumplir con los requisitos de
                        Facebook.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        5. Cuentas de Usuario
                    </h2>
                    <p>
                        Para utilizar nuestros servicios, puede ser necesario
                        que autorice la conexión con su cuenta de Facebook.
                        Usted es responsable de mantener la confidencialidad de
                        su cuenta y de todas las actividades que ocurran bajo su
                        cuenta. Debe notificarnos inmediatamente de cualquier
                        uso no autorizado de su cuenta.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        6. Contenido del Usuario
                    </h2>
                    <p>
                        Usted conserva todos los derechos sobre el contenido que
                        proporciona a través de nuestros servicios. Sin embargo,
                        al utilizar nuestros servicios, usted nos otorga una
                        licencia no exclusiva, mundial, libre de regalías y
                        transferible para usar, reproducir, modificar, adaptar,
                        publicar y distribuir su contenido únicamente para
                        proporcionar y mejorar nuestros servicios.
                    </p>
                    <p>
                        Usted garantiza que tiene todos los derechos necesarios
                        sobre el contenido que proporciona y que dicho contenido
                        no viola los derechos de terceros ni ninguna ley
                        aplicable.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        7. Propiedad Intelectual
                    </h2>
                    <p>
                        Todos los derechos de propiedad intelectual sobre
                        nuestros servicios, incluyendo pero no limitado a
                        software, diseño, texto, gráficos, logos e iconos, son
                        propiedad nuestra o de nuestros licenciantes. Estos
                        términos no le otorgan ningún derecho sobre nuestra
                        propiedad intelectual.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        8. Limitación de Responsabilidad
                    </h2>
                    <p>
                        EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, NUESTROS
                        SERVICIOS SE PROPORCIONAN &quot;TAL CUAL&quot; Y
                        &quot;SEGÚN DISPONIBILIDAD&quot;, SIN GARANTÍAS DE
                        NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS.
                    </p>
                    <p>
                        No garantizamos que nuestros servicios serán
                        ininterrumpidos, seguros, libres de errores o que
                        cumplirán con sus expectativas. No seremos responsables
                        de ningún daño directo, indirecto, incidental, especial,
                        consecuente o punitivo que resulte del uso o la
                        imposibilidad de usar nuestros servicios.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">9. Indemnización</h2>
                    <p>
                        Usted acepta indemnizar, defender y eximir de
                        responsabilidad a nosotros, nuestros afiliados,
                        directores, empleados y agentes de cualquier reclamo,
                        daño, obligación, pérdida, responsabilidad, costo o
                        deuda, y gastos (incluyendo honorarios de abogados) que
                        surjan de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Su uso de nuestros servicios</li>
                        <li>Su violación de estos Términos y Condiciones</li>
                        <li>Su violación de cualquier derecho de terceros</li>
                        <li>
                            El contenido que proporciona a través de nuestros
                            servicios
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        10. Modificaciones del Servicio
                    </h2>
                    <p>
                        Nos reservamos el derecho de modificar, suspender o
                        discontinuar cualquier aspecto de nuestros servicios en
                        cualquier momento, con o sin aviso previo. No seremos
                        responsables ante usted ni ante ningún tercero por
                        cualquier modificación, suspensión o discontinuación de
                        nuestros servicios.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">11. Terminación</h2>
                    <p>
                        Podemos terminar o suspender su acceso a nuestros
                        servicios inmediatamente, sin aviso previo, por
                        cualquier motivo, incluyendo pero no limitado a una
                        violación de estos Términos y Condiciones.
                    </p>
                    <p>
                        Usted puede dejar de utilizar nuestros servicios en
                        cualquier momento desvinculando su cuenta de Facebook o
                        dejando de interactuar con nuestros servicios.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">12. Privacidad</h2>
                    <p>
                        Su uso de nuestros servicios también está regido por
                        nuestra Política de Privacidad. Al utilizar nuestros
                        servicios, usted consiente la recopilación y el uso de
                        su información de acuerdo con nuestra Política de
                        Privacidad.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        13. Ley Aplicable
                    </h2>
                    <p>
                        Estos Términos y Condiciones se regirán e interpretarán
                        de acuerdo con las leyes aplicables, sin dar efecto a
                        ningún principio de conflictos de leyes. Cualquier
                        disputa relacionada con estos términos será sometida a
                        la jurisdicción exclusiva de los tribunales competentes.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        14. Modificaciones de los Términos
                    </h2>
                    <p>
                        Nos reservamos el derecho de modificar estos Términos y
                        Condiciones en cualquier momento. Las modificaciones
                        entrarán en vigor inmediatamente después de su
                        publicación. Su uso continuado de nuestros servicios
                        después de cualquier modificación constituye su
                        aceptación de los términos modificados.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        15. Disposiciones Generales
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Acuerdo completo:</strong> Estos términos
                            constituyen el acuerdo completo entre usted y
                            nosotros respecto al uso de nuestros servicios.
                        </li>
                        <li>
                            <strong>Divisibilidad:</strong> Si alguna
                            disposición de estos términos se considera inválida
                            o inaplicable, las disposiciones restantes
                            permanecerán en pleno vigor y efecto.
                        </li>
                        <li>
                            <strong>Renuncia:</strong> El hecho de que no
                            ejerzamos algún derecho o disposición de estos
                            términos no constituirá una renuncia a tal derecho o
                            disposición.
                        </li>
                        <li>
                            <strong>Cesación:</strong> No puede ceder o
                            transferir estos términos o sus derechos bajo estos
                            términos sin nuestro consentimiento previo por
                            escrito.
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">16. Contacto</h2>
                    <p>
                        Si tiene preguntas sobre estos Términos y Condiciones,
                        puede contactarnos a través de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Email: [su-email@ejemplo.com]</li>
                        <li>Sitio web: https://iverse.dev</li>
                    </ul>
                    <p className="text-sm text-muted mt-4">
                        Nota: Por favor, reemplace [su-email@ejemplo.com] con su
                        dirección de email real.
                    </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-line">
                    <p className="text-sm text-muted">
                        Estos términos cumplen con los requisitos del Portal de
                        Desarrolladores de Facebook para aplicaciones que
                        integran Messenger y conversaciones de Facebook.
                    </p>
                </div>
            </div>
        </section>
    )
}
