package site.maoamiga.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "medicamento")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Medicamento {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "nome", nullable = false,length = 100)
    private String nome;

    @Column(name = "dosagem", nullable = false,length = 50)
    private String dosagem;

    @Column (name = "quantidade",nullable = false)
    private Integer quantidade;

    @Column(name = "validade", nullable = false)
    private LocalDate validade;

    @Column(name = "intervalo_horas", nullable = false)
    private Integer intervaloHoras;

    @Column (name="horario", nullable = false)
    private LocalTime horario;

}
